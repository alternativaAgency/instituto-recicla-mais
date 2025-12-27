const Values = () => {
  const values = [
    {
      title: "Dignidade do trabalho",
      description: "Reconhecendo e valorizando as pessoas como o centro de qualquer transformação sustentável."
    },
    {
      title: "Transparência nos processos",
      description: "Garantindo clareza, responsabilidade e confiança em todas as nossas ações."
    },
    {
      title: "Ética nas relações",
      description: "Pautando parcerias justas, respeitosas e coerentes com nosso propósito."
    },
    {
      title: "Busca contínua por impacto positivo",
      description: "Assegurando que cada iniciativa contribua para transformar vidas e fortalecer o futuro da sustentabilidade."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white/95 backdrop-blur-sm">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <h2 className="mb-8 sm:mb-10 md:mb-12 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center text-mata-900">
          Nossos Valores
        </h2>
        <p className="mb-8 sm:mb-10 md:mb-12 text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700 text-center max-w-3xl mx-auto">
          Nossos valores refletem o compromisso com:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 md:p-10 rounded-2xl bg-limpeza border border-mata-900 transition-colors duration-300"
            >
              <h3 className="mb-4 sm:mb-5 text-xl sm:text-2xl md:text-3xl font-semibold text-mata-900">
                {value.title}
              </h3>
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700">
                {value.description}
              </p>
            </div>
          ))}
        </div>
        
        <p className="mt-10 sm:mt-12 md:mt-16 text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-700 text-center max-w-4xl mx-auto">
          Guiados por esses princípios, trabalhamos diariamente para construir soluções consistentes, inclusivas e regenerativas, capazes de gerar mudanças reais hoje e para as próximas gerações.
        </p>
      </div>
    </section>
  );
};

export default Values;

