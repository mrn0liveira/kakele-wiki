const messages = {
  forgeCalculator: {
    title: 'Calculadora de Forja',
    descriptiom: 'Calcula la cantidad de recursos necesarios para forjar un artículo.',
    inputText: 'Nivel de Forja',
    popoverTitle: 'Valor de Mercado',
    popoverDescription: 'Añade el valor de mercado del artículo.',
    cardTitle: 'Selecciona un valor para calcular',
    cardDescription: 'Haz clic en el recurso para establecer el valor',
    cost: 'Costo de Forja',
    copper: 'Cobre',
    tin: 'Estaño',
    silver: 'Plata',
    iron: 'Hierro',
    gold: 'Oro',
    money: 'Dinero',
  },
  coinsHub: {
    ad1: 'Compra objetos de Kakele',
    modal1: '¡Ayuda a mantener el proyecto en línea!',
    modal2: 'Compra en',
    modal3: 'No quiero ayudar',
  },
  notFound: {
    title: 'No Encontrado',
    subtitle: 'No pudimos encontrar la página que estás buscando.',
    button: 'Ir a Inicio',
  },
  navbar: {
    items: {
      label: 'Objetos',
      title: 'Objetos del Juego',
      subhead: 'Explora todos los objetos de Kakele',
    },
    tools: {
      label: 'Herramientas',
      title: 'Herramientas',
      subhead: 'Mejora tu jugabilidad con herramientas',
      blessCalculator: 'Calculadora de Bendiciones',
      setCalculator: 'Calculadora de Conjunto',
      tasksList: 'Lista de Tareas',
      gameMap: 'Mapa del Juego',
      forgeCalculator: 'Calculadora de Forja',
    },
  },
  blog: {
    title: 'Artículos y Tutoriales',
  },
  home: {
    title: 'Inicio',
    quickAcess: 'Acceso Rápido',
    ad: 'Compra Monedas y objetos de Kakele',
    mobileAd: 'Compra Monedas de Kakele',
    subhead: 'Tu mejor lugar para mejorar la jugabilidad',
    viewAll: 'Ver Todo',
    cards: {
      coinshub: {
        title: 'Coinshub',
        description: 'Compra Monedas y objetos de Kakele para mejorar tu experiencia de juego.',
      },
      blessCalculator: {
        title: 'Calculadora de Bendiciones',
        description: 'Calcula la cantidad de recursos necesarios para bendecir tus objetos.',
      },
      setCalculator: {
        title: 'Calculadora de Conjunto',
        description: 'Calcula el mejor conjunto para tu equipamiento basado en nivel, vocación e objetos.',
      },
      tasks: {
        title: 'Calculadora de Tareas',
        description: 'Calcula las mejores tareas para tu personaje basado en recompensas, nivel y objetos.',
      },
      forgeCalculator: {
        title: 'Calculadora de Forja',
        description: 'Calcula la cantidad de recursos necesarios para forjar un artículo.',
      },
    },
  },
  kakele: {
    common: {
      Sources: 'Fuentes',
      Monsters: 'Monstruos',
      NPCs: 'NPCs',
      Quests: 'Misiones',
    },
    energy: {
      Dark: 'Oscuro',
      Light: 'Luz',
      Nature: 'Naturaleza',
      All: 'Todos',
      None: 'Ninguno',
    },
    attributes: {
      Attack: 'Ataque',
      Magic: 'Magia',
      Armor: 'Armadura',
      magic: 'Magia',
      armor: 'Armadura',
      attack: 'Ataque',
    },
    vocations: {
      All: 'Todos',
      None: 'Ninguno',
      Alchemist: 'Alquimista',
      Hunter: 'Cazador',
      Mage: 'Mago',
      Warrior: 'Guerrero',
      Berserker: 'Berserker',
    },
    itemTypes: {
      Helmet: 'Casco',
      Armor: 'Armadura',
      Boots: 'Botas',
      SecondaryHand: 'Mano Secundaria',
      Necklace: 'Collar',
      Ring: 'Anillo',
      Legs: 'Piernas',
      Tool: 'Herramienta',
      PrimaryHand: 'Mano Primaria',
      Equipment: 'Equipo',
      Weapon: 'Arma',
      Food: 'Comida',
      Others: 'Otros',
    },
    itemStats: {
      Attack: 'Ataque',
      Magic: 'Magia',
      Armor: 'Armadura',
      magic: 'Magia',
      armor: 'Armadura',
      value: 'Valor',
      gold: 'Oro',
      xp: 'XP',
      level: 'Nivel',
      sources: 'Fuentes',
      energy: 'Energía',
    },
    rarities: {
      Common: 'Común',
      Uncommon: 'Inusual',
      Rare: 'Raro',
      Legendary: 'Legendario',
      Relic: 'Reliquia',
    },
  },

  blessCalculator: {
    title: 'Calculadora de Bendiciones',
    description: 'Calcula la cantidad de recursos necesarios para bendecir tus objetos.',
    searchTitle: 'Buscar objetos',
    searchPlaceholder: 'Casco de Elora',
    searchEmpty: 'Ningún objeto encontrado',
    requiredItemsTitle: 'Objetos Necesarios',
    requiredItemsDescription: 'Objetos necesarios para alcanzar el nivel de bendición deseado.',
    optionsTitle: 'Opciones',
    optionsDescription: 'Selecciona tus opciones deseadas.',
    blessRange: 'Alcance de la Bendición',
    ignoredItemsTitle: 'Objetos Ignorados',
    itemBonus: 'Bono del Objeto:',
    blessBonus: 'Bono de la Bendición:',
    forgeBonus: 'Bono de la Forja:',
    totalBonus: 'Total:',
    blessGold: 'Oro Necesario',
    level: 'Nivel',
    value: 'Valor',
    energy: 'Energía',
    attack: 'Ataque',
    armor: 'Armadura',
    magic: 'Magia',
    itemTypes: {
      Equipment: 'Equipamiento',
      Weapon: 'Arma',
    },
    rarities: {
      Common: 'Común',
      Uncommon: 'Poco Común',
      Rare: 'Raro',
      Legendary: 'Legendario',
      Relic: 'Reliquia',
    },
    error: {
      noItems: 'Ningún objeto para calcular',
      initialAndFinalValuesMustBeNumbers: 'Los valores inicial y final deben ser números',
      initialValueGreaterThanFinalValue: 'El valor inicial debe ser mayor que el valor final',
    },
  },
  taskCalculator: {
    title: 'Calculadora de Tareas',
    description: 'Calcula las mejores tareas para tu personaje.',
    containerTitle: 'Selecciona una tarea para calcular',
    containerDescription: 'Haz clic en la tarea que deseas abrir',
    valueInputTitle: 'Valor',
    valueInputSubtitle: 'Ingresa el valor de cada objeto',
    amountInputTitle: 'Cantidad',
    amountInputSubtitle: 'Ingresa la cantidad de cada objeto',
    xp: 'Experiencia',
    gold: 'Oro',
    loss: 'Pérdida',
    profit: 'Beneficio',
    completedTasks: 'Tareas Completadas',
  },
  setCalculator: {
    title: 'Calculadora de Conjunto',
    description: 'Calcula el mejor conjunto para tu equipamiento.',
    toolTitle: 'Configura tu equipamiento',
    toolDescription: 'Selecciona nivel, vocación y objetos para calcular el mejor conjunto.',
    itemsInvTitle: 'Inventario de Objetos',
    itemsInvDescription: 'Haz clic para ver detalles del objeto.',
    totalStatsTitle: 'Estadísticas Totales',
    ignoredItemsTitle: 'Objetos Ignorados',
    filtersTitle: 'Filtros',
    filtersDescription: 'Selecciona tus filtros deseados.',
    vocationMenuTitle: 'Vocación',

    attributeMenuTitle: 'Atributo',
    elementMenuTitle: 'Energía',
    resultTitle: 'Conjunto de Objetos',
    excludeExpensiveItems: 'Excluir Objetos Caros',
    resultDescription: 'Mejor conjunto para tu equipamiento con base en nivel, vocación y objetos.',
  },
  items: {
    title: 'Objetos de Kakele',
    description: 'Ve todos los objetos de Kakele y sus estadísticas',
    searchTitle: 'Buscar un objeto',
    searchDescription: 'Encuentra un objeto por nombre, tipo, vocación o atributo',
    searchPlaceholder: 'Buscar un objeto',
    searchEmpty: 'Ningún objeto encontrado',
    element: 'Elemento',
    vocation: 'Vocación',
    filterByTitle: 'Filtrar por',
    filterBy: {
      Helmet: 'Casco',
      Armor: 'Armadura',
      Boots: 'Botas',
      SecondaryHand: 'Mano Secundaria',
      Necklace: 'Collar',
      Ring: 'Anillo',
      Legs: 'Piernas',
      Tool: 'Herramienta',
      PrimaryHand: 'Mano Primaria',
      None: 'Ninguno',
    },
    sortByTitle: 'Ordenar por',
    sortBy: {
      attack: 'Ataque',
      armor: 'Armadura',
      magic: 'Magia',
      value: 'Valor',
      level: 'Nivel',
    },
  },
  seo: {
    homeLayout: {
      title: 'Kakele Wiki',
      description: 'El mejor lugar para mejorar tu experiencia de juego con Herramientas y Guías.',
      keywords: 'Kakele, Wiki, Herramientas, Guías, Mejorar, Juego, Jugar, Jugabilidad, MMORPG, Tibia, Magia',
    },
  },
};

export default messages;
