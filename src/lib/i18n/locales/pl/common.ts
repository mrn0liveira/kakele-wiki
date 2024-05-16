const messages = {
  coinsHub: {
    ad1: 'Kup przedmioty z Kakele',
    modal1: 'Pomóż utrzymać projekt online!',
    modal2: 'Kupuj w',
    modal3: 'Nie chcę pomagać',
  },
  notFound: {
    title: 'Nie znaleziono',
    subtitle: 'Nie udało nam się znaleźć strony, której szukasz.',
    button: 'Przejdź do strony głównej',
  },
  navbar: {
    items: {
      label: 'Przedmioty',
      title: 'Przedmioty w grze',
      subhead: 'Odkryj wszystkie przedmioty w Kakele',
    },
    tools: {
      label: 'Narzędzia',
      title: 'Narzędzia',
      subhead: 'Popraw swoją rozgrywkę za pomocą narzędzi',
      blessCalculator: 'Kalkulator błogosławieństw',
      setCalculator: 'Kalkulator zestawów',
      tasksList: 'Lista zadań',
      gameMap: 'Mapa gry',
    },
  },
  blog: {
    title: 'Artykuły i samouczki',
  },
  home: {
    title: 'Strona główna',
    quickAcess: 'Szybki dostęp',
    ad: 'Kup monety i przedmioty z Kakele',
    mobileAd: 'Kup monety Kakele',
    subhead: 'Twoje najlepsze miejsce do poprawy rozgrywki',
    viewAll: 'Zobacz wszystko',
    cards: {
      coinshub: {
        title: 'Coinshub',
        description: 'Kup monety i przedmioty z Kakele, aby poprawić swoje doświadczenie w grze.',
      },
      blessCalculator: {
        title: 'Kalkulator błogosławieństw',
        description: 'Oblicz ilość potrzebnych surowców do błogosławienia swoich przedmiotów.',
      },
      setCalculator: {
        title: 'Kalkulator zestawów',
        description: 'Oblicz najlepszy zestaw dla swojego ekwipunku na podstawie poziomu, profesji i przedmiotów.',
      },
      tasks: {
        title: 'Kalkulator zadań',
        description: 'Oblicz najlepsze zadania dla swojej postaci na podstawie nagród, poziomu i przedmiotów.',
      },
    },
  },
  kakele: {
    energy: {
      Dark: 'Ciemność',
      Light: 'Światło',
      Nature: 'Natura',
      All: 'Wszystkie',
      None: 'Żaden',
    },
    attributes: {
      Attack: 'Atak',
      Magic: 'Magia',
      Armor: 'Pancerz',
      magic: 'Magia',
      armor: 'Pancerz',
      attack: 'Atak',
    },
    vocations: {
      All: 'Wszystkie',
      None: 'Żaden',
      Alchemist: 'Alchemik',
      Hunter: 'Łowca',
      Mage: 'Mag',
      Warrior: 'Wojownik',
      Berserker: 'Berserker',
    },
    itemTypes: {
      Helmet: 'Hełm',
      Armor: 'Pancerz',
      Boots: 'Buty',
      SecondaryHand: 'Drugorzędna ręka',
      Necklace: 'Naszyjnik',
      Ring: 'Pierścień',
      Legs: 'Nogi',
      Tool: 'Narzędzie',
      PrimaryHand: 'Pierwsza ręka',
    },
    rarities: {
      Common: 'Zwyczajny',
      Uncommon: 'Niezwykły',
      Rare: 'Rzadki',
      Legendary: 'Legendarny',
      Relic: 'Relikwia',
    },
  },
  blessCalculator: {
    title: 'Kalkulator błogosławieństw',
    description: 'Oblicz ilość potrzebnych surowców do błogosławienia swoich przedmiotów.',
    searchTitle: 'Wyszukaj przedmioty',
    searchPlaceholder: 'Hełm Elory',
    searchEmpty: 'Nie znaleziono żadnych przedmiotów',
    requiredItemsTitle: 'Potrzebne przedmioty',
    requiredItemsDescription: 'Przedmioty potrzebne do osiągnięcia pożądanego poziomu błogosławieństwa.',
    optionsTitle: 'Opcje',
    optionsDescription: 'Wybierz swoje preferowane opcje.',
    blessRange: 'Zasięg błogosławieństwa',
    ignoredItemsTitle: 'Zignorowane przedmioty',
    itemBonus: 'Bonus przedmiotu:',
    blessBonus: 'Bonus błogosławieństwa:',
    forgeBonus: 'Bonus kuźni:',
    totalBonus: 'Łącznie:',
    blessGold: 'Potrzebne złoto',
    level: 'Poziom',
    value: 'Wartość',
    energy: 'Energia',
    attack: 'Atak',
    armor: 'Pancerz',
    magic: 'Magia',
    itemTypes: {
      Equipment: 'Wyposażenie',
      Weapon: 'Broń',
    },
    rarities: {
      Common: 'Zwyczajny',
      Uncommon: 'Niezwykły',
      Rare: 'Rzadki',
      Legendary: 'Legendarny',
      Relic: 'Relikwia',
    },
    error: {
      noItems: 'Brak przedmiotów do obliczenia',
      initialAndFinalValuesMustBeNumbers: 'Początkowa i końcowa wartość muszą być liczbami',
      initialValueGreaterThanFinalValue: 'Początkowa wartość musi być większa niż końcowa wartość',
    },
  },
  taskCalculator: {
    title: 'Kalkulator zadań',
    description: 'Oblicz najlepsze zadania dla swojej postaci.',
    containerTitle: 'Wybierz zadanie do obliczenia',
    containerDescription: 'Kliknij zadanie, które chcesz otworzyć',
    valueInputTitle: 'Wartość',
    valueInputSubtitle: 'Wpisz wartość każdego przedmiotu',
    amountInputTitle: 'Ilość',
    amountInputSubtitle: 'Wpisz ilość każdego przedmiotu',
    xp: 'Doświadczenie',
    gold: 'Złoto',
    loss: 'Strata',
    profit: 'Zysk',
    completedTasks: 'Ukończone zadania',
  },
  setCalculator: {
    title: 'Kalkulator zestawów',
    description: 'Oblicz najlepszy zestaw dla swojego ekwipunku.',
    toolTitle: 'Skonfiguruj swój ekwipunek',
    toolDescription: 'Wybierz poziom, profesję i przedmioty, aby obliczyć najlepszy zestaw.',
    itemsInvTitle: 'Inwentarz przedmiotów',
    itemsInvDescription: 'Kliknij, aby zobaczyć szczegóły przedmiotu.',
    totalStatsTitle: 'Całkowite statystyki',
    ignoredItemsTitle: 'Zignorowane przedmioty',
    filtersTitle: 'Filtry',
    filtersDescription: 'Wybierz swoje preferowane filtry.',
    vocationMenuTitle: 'Profesja',
    attributeMenuTitle: 'Atrybut',
    elementMenuTitle: 'Energia',
    resultTitle: 'Zestaw przedmiotów',
    excludeExpensiveItems: 'Wyklucz drogie przedmioty',
    resultDescription: 'Najlepszy zestaw dla twojego ekwipunku na podstawie poziomu, profesji i przedmiotów.',
  },
  items: {
    title: 'Przedmioty z Kakele',
    description: 'Zobacz wszystkie przedmioty z Kakele i ich statystyki',
    searchTitle: 'Wyszukaj przedmiot',
    searchDescription: 'Znajdź przedmiot według nazwy, typu, profesji lub atrybutu',
    searchPlaceholder: 'Wyszukaj przedmiot',
    searchEmpty: 'Nie znaleziono żadnych przedmiotów',
    element: 'Element',
    vocation: 'Profesja',
    filterByTitle: 'Filtruj według',
    filterBy: {
      Helmet: 'Hełm',
      Armor: 'Pancerz',
      Boots: 'Buty',
      SecondaryHand: 'Drugorzędna ręka',
      Necklace: 'Naszyjnik',
      Ring: 'Pierścień',
      Legs: 'Nogi',
      Tool: 'Narzędzie',
      PrimaryHand: 'Pierwsza ręka',
      None: 'Żaden',
    },
    sortByTitle: 'Sortuj według',
    sortBy: {
      attack: 'Atak',
      armor: 'Pancerz',
      magic: 'Magia',
      value: 'Wartość',
      level: 'Poziom',
    },
  },
  seo: {
    homeLayout: {
      title: 'Wiki Kakele',
      description: 'Najlepsze miejsce do poprawy swojej rozgrywki za pomocą narzędzi i przewodników.',
      keywords: 'Kakele, Wiki, Narzędzia, Przewodniki, Poprawa, Gra, Grać, Rozgrywka, MMORPG, Tibia, Magia',
    },
  },
};

export default messages;