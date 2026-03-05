export interface CityData {
    id: number;
    cityName: string;
    slug: string;
    state: string;
    longitude: number;
    latitude: number;
    jobsDone: number;
    trashRecycledKg: number;
    description?: string;
    images?: string[];
}

export const cities: CityData[] = [
    { id: 1, cityName: "Belo Horizonte", slug: "belo-horizonte", state: "mg", longitude: -43.9378, latitude: -19.9167, jobsDone: 245, trashRecycledKg: 125000, description: "Apoio intenso às cooperativas locais de Belo Horizonte, transformando a gestão de resíduos sólidos e gerando renda na capital mineira." },
    { id: 2, cityName: "São Paulo", slug: "sao-paulo", state: "sp", longitude: -46.6333, latitude: -23.5505, jobsDone: 512, trashRecycledKg: 285000, description: "Nosso maior polo de atuação, conectando catadores da metrópole à indústria de reciclagem com tecnologia e eficiência." },
    { id: 3, cityName: "Rio de Janeiro", slug: "rio-de-janeiro", state: "rj", longitude: -43.1729, latitude: -22.9068, jobsDone: 389, trashRecycledKg: 198000, description: "Projetos voltados para a orla marítima e comunidades fluminenses, promovendo conscientização e limpeza urbana." },
    { id: 4, cityName: "Vitória", slug: "vitoria", state: "es", longitude: -40.3128, latitude: -20.3155, jobsDone: 178, trashRecycledKg: 95000, description: "Trabalho cooperativo focado na economia circular e no desenvolvimento de novas tecnologias de triagem." },
    { id: 5, cityName: "Brasília", slug: "brasilia", state: "df", longitude: -47.8825, latitude: -15.7942, jobsDone: 156, trashRecycledKg: 82000, description: "Incentivo a políticas públicas e estruturação de centros logísticos para os materiais recicláveis no DF." },
    { id: 6, cityName: "Boa Vista", slug: "boa-vista", state: "rr", longitude: -60.6719, latitude: 2.8197, jobsDone: 0, trashRecycledKg: 0, description: "Iniciando atividades para estruturar a cadeia da reciclagem na região norte do Brasil." },
    { id: 7, cityName: "Ji-Paraná", slug: "ji-parana", state: "ro", longitude: -61.9411, latitude: -10.8853, jobsDone: 0, trashRecycledKg: 0, description: "Projeto semente para integração de associações de catadores de Rondônia." },
    { id: 8, cityName: "Brumado", slug: "brumado", state: "ba", longitude: -41.6653, latitude: -14.2036, jobsDone: 0, trashRecycledKg: 0, description: "Desenvolvimento de matrizes sustentáveis no semiárido baiano." },
    { id: 9, cityName: "Várzea Grande", slug: "varzea-grande", state: "mt", longitude: -56.1322, latitude: -15.6467, jobsDone: 0, trashRecycledKg: 0, description: "Base operacional emergente no estado de Mato Grosso, fortalecendo a coleta inteligente." },
    { id: 10, cityName: "Conselheiro Pena", slug: "conselheiro-pena", state: "mg", longitude: -41.4722, latitude: -19.1789, jobsDone: 0, trashRecycledKg: 0, description: "Expansão da rede no interior de Minas Gerais para alcançar comunidades menores." },
    { id: 11, cityName: "Blumenau", slug: "blumenau", state: "sc", longitude: -49.0661, latitude: -26.9194, jobsDone: 0, trashRecycledKg: 0, description: "Iniciativas focadas na integração da indústria têxtil com a reciclagem de materiais em Santa Catarina." },
    { id: 12, cityName: "Itapema", slug: "itapema", state: "sc", longitude: -48.6128, latitude: -27.0908, jobsDone: 0, trashRecycledKg: 0, description: "Proteção costeira e educação ambiental intensiva durante períodos de alta temporada." },
    { id: 13, cityName: "Juazeiro do Norte", slug: "juazeiro-do-norte", state: "ce", longitude: -39.3153, latitude: -7.2131, jobsDone: 0, trashRecycledKg: 0, description: "Apoio cultural e social aos catadores da região do Cariri, promovendo dignidade e inclusão." },
    { id: 14, cityName: "Belém", slug: "belem", state: "pa", longitude: -48.5044, latitude: -1.4558, jobsDone: 0, trashRecycledKg: 0, description: "Preservação da Amazônia aliada à geração de recursos através do reaproveitamento qualificado de materiais." },
];
