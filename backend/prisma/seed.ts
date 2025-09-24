import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const driversData = [
    {
      name: "Homer Simpson",
      description:
        "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      vehicle: "Plymouth Valiant 1973 rosa e enferrujado",
      rating: 2,
      comment:
        "Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
      rate_per_km: 2.5,
      min_distance: 1,
    },
    {
      name: "Dominic Toretto",
      description:
        "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
      vehicle: "Dodge Charger R/T 1970 modificado",
      rating: 4,
      comment:
        "Que viagem incrível! O carro é um show à parte e o motorista foi super gente boa. Recomendo!",
      rate_per_km: 5.0,
      min_distance: 5,
    },
    {
      name: "James Bond",
      description:
        "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
      vehicle: "Aston Martin DB5 clássico",
      rating: 5,
      comment:
        "Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico.",
      rate_per_km: 10.0,
      min_distance: 10,
    },
  ];

  // Se não houver corridas, limpamos a tabela de drivers (útil em dev)
  const ridesCount = await prisma.ride.count();
  if (ridesCount === 0) {
    await prisma.driver.deleteMany({});
    const { count } = await prisma.driver.createMany({ data: driversData });
    console.log(`Tabela de motoristas pré-populada com sucesso! (${count} registros)`);
    return;
  }

  // Caso já existam corridas, evitamos deletar e criamos apenas os que faltam
  let created = 0;
  for (const d of driversData) {
    const exists = await prisma.driver.findFirst({ where: { name: d.name } });
    if (!exists) {
      await prisma.driver.create({ data: d });
      created += 1;
    }
  }
  console.log(
    created > 0
      ? `Seed concluído. Novos motoristas criados: ${created}`
      : "Seed concluído. Nenhum novo motorista necessário."
  );
}

main()
  .catch((e) => {
    console.error("Erro ao executar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
