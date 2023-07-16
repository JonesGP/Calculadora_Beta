let changelog_versions = [
    {
        version: "v0.0.6 13.07.2023",
        added: [
            "adicionado changelog ao projeto para melhor versionamento do mesmo",
            "adicionado um botão para ver o changelog"
        ],
        fixed: [
            "corrigido bugs com o tema e melhorias de performance"
        ]
    },
    {
        version: "v0.0.5",
        added: [
            "adicionado a aba resultados com todas as operações feitas atualmente"
        ]
    },
    {
        version: "v0.0.4",
        added: [
            "adicionado o salvamento das configurações atuais no próprio navegador para quando recarregar a página as informações continuem"
        ]
    },
    {
        version: "v0.0.3",
        added: [
            "adicionado novo tema",
            "adicionado opção para poder desligar as bolhas para melhorar a performance",
            "adicionado modo escuro"
        ]
    },
    {
        version: "v0.0.2",
        added: [
            "cálculo com raiz quadrada, parênteses, porcentagem, pi, elevado",
            "melhorias no design"
        ]
    },
    {
        version: "v0.0.1",
        added: [
            "adicionado bolhas no fundo"
        ]
    },
    {
        version: "v0.0.0",
        added: [
            "versão inicial",
            "lançamento da calculadora topper"
        ]
    }
];
let texts_tutorial = [
    {
        top: '50%',
        left: '50%',
        position: 'translate(-150px, -400px)',
        text: 'Seja bem vindo a minha humilde calculadora, se quiser um tutorial de como funciona as coisa por aqui, clique no botão continuar, se não clique em pular.'
    },
    {
        top: '80px',
        left: '30px',
        position: '',
        text: 'Aqui é o menu, nele voce pode ativar e desativar as bolhas, a opção de modo escuro, e poder mudar o tema!'
    },
    {
        top: '100px',
        left: '40px',
        position: '',
        text: 'O botão bolhas, se ativado, irá mostrar o fundo com as bolhas com animação de reflexos, porém esse recurso consome muito processador.'
    },
    {
        top: '100px',
        left: '100px',
        position: '',
        text: 'O segundo botão ativa o modo escuro.'
    },
    {
        top: '100px',
        left: '150px',
        position: '',
        text: 'O terceiro abre uma lista com os temas para voce escolher.'
    },
    {
        top: '100px',
        left: '310px',
        position: '',
        text: 'O quarto abre o tutorial novamente.'
    },
    {        
        top: '100px',
        left: '400px',
        position: '',
        text: 'O quinto abre um lista com todos os idiomas disponíveis.' 
    },
    {
        top: '50%',
        left: '50%',
        position: 'translate(-150px, 300px)',
        text: 'Aqui nesta seçao ficaram armazenados todos os resultados que voce fez com as operações.'
    },
    {
        top: '50%',
        left: '50%',
        position: 'translate(-150px, -370px)',
        text: 'Aqui é a nossa calculadora que foi feita com o objetivo de melhorar a sua experiência e torna os calculos mais divertidos.'
    },
    {
        top: '82vh',
        left: '100px',
        position: '',
        text: 'E por ultimo, aqui você pode ver o changelog do projeto, com todas as alterações feitas.'
    }
]
let texts_tutorial_en = [
    {
        text: 'Welcome to my humble calculator, if you want a tutorial on how things work around here, click on the continue button, if not click on skip.'
    },
    {
        text: 'Here is the menu, where you can activate and deactivate the bubbles, the dark mode option, and change the theme!'
    },
    {
        text: 'The bubbles button, if enabled, will show the background with the bubbles with animated reflections, but this feature is processor intensive.'
    },
    {
        text: 'The second button activates dark mode.'
    },
    {
        text: 'The third opens a list of themes for you to choose from.'
    },
    {
        text: 'The fourth opens the tutorial again.'
    },
    {
        text: 'The fifth opens a list with all the available languages.'
    },
    {
        text: 'Here in this section all the results that you made with the operations were stored.'
    },
    {
        text: 'Here is our calculator that was made with the aim of improving your experience and making calculations more fun.'
    },
    {
        text: "And finally, here you can see the project's changelog, with all the changes made."
    }
]
let texts_tutorial_es = [
    {
        text: 'Bienvenido a mi humilde calculadora, si quieres un tutorial sobre cómo funcionan las cosas aquí, haz clic en el botón continuar, si no haz clic en el botón saltar.'
    },
    {
        text: 'Aquí está el menú, donde puedes activar y desactivar las burbujas, la opción de modo oscuro y cambiar el tema.'
    },
    {
        text: 'El botón de burbujas, si está activado, mostrará el fondo con las burbujas con reflejos animados, pero esta función consume muchos recursos del procesador.'
    },
    {
        text: 'El segundo botón activa el modo oscuro.'
    },
    {
        text: 'El tercer botón abre una lista de temas para que elijas.'
    },
    {
        text: 'El cuarto botón abre el tutorial nuevamente.'
    },
    {
        text: 'El quinto botón abre una lista con todos los idiomas disponibles.'
    },
    {
        text: 'Aquí en esta sección se han almacenado todos los resultados que has realizado con las operaciones.'
    },
    {
        text: 'Aquí está nuestra calculadora que se hizo con el objetivo de mejorar tu experiencia y hacer los cálculos más divertidos.'
    },
    {
        text: 'Y por último, aquí puedes ver el registro de cambios del proyecto, con todos los cambios realizados.'
    }
];
let texts_tutorial_it = [
    {
        text: 'Benvenuto nella mia umile calcolatrice, se desideri un tutorial su come funzionano le cose qui, clicca sul pulsante continua, se non lo desideri clicca su salta.'
    },
    {
        text: 'Ecco il menu, dove puoi attivare e disattivare le bolle, l\'opzione modalità scura e cambiare il tema!'
    },
    {
        text: 'Il pulsante bolle, se abilitato, mostrerà lo sfondo con le bolle con riflessi animati, ma questa funzione richiede molte risorse del processore.'
    },
    {
        text: 'Il secondo pulsante attiva la modalità scura.'
    },
    {
        text: 'Il terzo pulsante apre una lista di temi tra cui scegliere.'
    },
    {
        text: 'Il quarto pulsante apre nuovamente il tutorial.'
    },
    {
        text: 'Il quinto pulsante apre una lista con tutte le lingue disponibili.'
    },
    {
        text: 'In questa sezione vengono memorizzati tutti i risultati ottenuti con le operazioni.'
    },
    {
        text: 'Questa è la nostra calcolatrice, realizzata con l\'obiettivo di migliorare la tua esperienza e rendere i calcoli più divertenti.'
    },
    {
        text: 'E infine, qui puoi vedere il registro delle modifiche del progetto, con tutte le modifiche apportate.'
    }
];
let texts_tutorial_fr = [
    {
        text: 'Bienvenue dans ma modeste calculatrice, si vous souhaitez un tutoriel sur le fonctionnement des choses ici, cliquez sur le bouton continuer, sinon cliquez sur passer.'
    },
    {
        text: 'Voici le menu, où vous pouvez activer et désactiver les bulles, l\'option mode sombre et changer le thème !'
    },
    {
        text: 'Le bouton bulles, s\'il est activé, affiche l\'arrière-plan avec les bulles aux reflets animés, mais cette fonctionnalité est gourmande en ressources processeur.'
    },
    {
        text: 'Le deuxième bouton active le mode sombre.'
    },
    {
        text: 'Le troisième ouvre une liste de thèmes parmi lesquels choisir.'
    },
    {
        text: 'Le quatrième ouvre à nouveau le tutoriel.'
    },
    {
        text: 'Le cinquième ouvre une liste avec toutes les langues disponibles.'
    },
    {
        text: 'Dans cette section, tous les résultats que vous avez obtenus avec les opérations sont stockés.'
    },
    {
        text: 'Voici notre calculatrice qui a été conçue dans le but d\'améliorer votre expérience et de rendre les calculs plus amusants.'
    },
    {
        text: 'Et enfin, ici vous pouvez voir le journal des modifications du projet, avec toutes les modifications apportées.'
    }
];
let texts_tutorial_nl = [
    {
        text: 'Welkom bij mijn bescheiden rekenmachine. Als je een tutorial wilt over hoe dingen hier werken, klik dan op de knop "Doorgaan". Als je dat niet wilt, klik dan op "Overslaan".'
    },
    {
        text: 'Hier is het menu, waar je de bubbels kunt activeren en deactiveren, de donkere modus kunt inschakelen en het thema kunt wijzigen!'
    },
    {
        text: 'De bubbels-knop, indien ingeschakeld, toont een achtergrond met bubbels en geanimeerde reflecties, maar deze functie vereist veel processorkracht.'
    },
    {
        text: 'De tweede knop activeert de donkere modus.'
    },
    {
        text: 'De derde knop opent een lijst met thema\'s om uit te kiezen.'
    },
    {
        text: 'De vierde knop opent de tutorial opnieuw.'
    },
    {
        text: 'De vijfde knop opent een lijst met alle beschikbare talen.'
    },
    {
        text: 'In deze sectie worden alle resultaten van de bewerkingen die je hebt uitgevoerd opgeslagen.'
    },
    {
        text: 'Hier is onze rekenmachine, gemaakt met als doel je ervaring te verbeteren en berekeningen leuker te maken.'
    },
    {
        text: 'En tot slot, hier kun je het wijzigingslogboek van het project bekijken, met alle wijzigingen die zijn aangebracht.'
    }
];
let texts_tutorial_pl = [
    {
        text: 'Witaj w mojej skromnej kalkulatorze. Jeśli chcesz przewodnik po tym, jak tu wszystko działa, kliknij przycisk "Kontynuuj", jeśli nie, kliknij "Pomiń".'
    },
    {
        text: 'Oto menu, gdzie możesz aktywować i dezaktywować bańki, opcję trybu ciemnego i zmienić motyw!'
    },
    {
        text: 'Przycisk bańek, jeśli jest włączony, pokaże tło z bańkami i animowanymi odbiciami, ale ta funkcja jest wymagająca dla procesora.'
    },
    {
        text: 'Drugi przycisk aktywuje tryb ciemny.'
    },
    {
        text: 'Trzeci otwiera listę motywów do wyboru.'
    },
    {
        text: 'Czwarty przycisk ponownie otwiera przewodnik.'
    },
    {
        text: 'Piąty otwiera listę wszystkich dostępnych języków.'
    },
    {
        text: 'W tej sekcji przechowywane są wszystkie wyniki operacji, które zostały wykonane.'
    },
    {
        text: 'Oto nasza kalkulator, który został stworzony w celu poprawienia Twojego doświadczenia i sprawienia, że obliczenia będą bardziej zabawne.'
    },
    {
        text: 'I wreszcie, tutaj możesz zobaczyć dziennik zmian projektu, ze wszystkimi wprowadzonymi zmianami.'
    }
];

let texts_tutorial_de = [
    {
        text: 'Willkommen in meinem bescheidenen Taschenrechner. Wenn du ein Tutorial darüber möchtest, wie hier alles funktioniert, klicke auf die Schaltfläche "Fortfahren", andernfalls klicke auf "Überspringen".'
    },
    {
        text: 'Hier ist das Menü, in dem du die Blasen aktivieren und deaktivieren, den Dunkelmodus aktivieren und das Thema ändern kannst!'
    },
    {
        text: 'Die Blasen-Schaltfläche zeigt, wenn aktiviert, den Hintergrund mit den Blasen und animierten Reflexionen an, aber diese Funktion beansprucht Prozessorleistung.'
    },
    {
        text: 'Die zweite Schaltfläche aktiviert den Dunkelmodus.'
    },
    {
        text: 'Die dritte Schaltfläche öffnet eine Liste von Themen, aus denen du wählen kannst.'
    },
    {
        text: 'Die vierte Schaltfläche öffnet das Tutorial erneut.'
    },
    {
        text: 'Die fünfte Schaltfläche öffnet eine Liste mit allen verfügbaren Sprachen.'
    },
    {
        text: 'In diesem Abschnitt werden alle Ergebnisse gespeichert, die du mit den Operationen erzielt hast.'
    },
    {
        text: 'Hier ist unser Taschenrechner, der entwickelt wurde, um dein Erlebnis zu verbessern und Berechnungen unterhaltsamer zu machen.'
    },
    {
        text: 'Und schließlich kannst du hier das Änderungsprotokoll des Projekts mit allen vorgenommenen Änderungen sehen.'
    }
];
let texts_tutorial_ru = [
    {
        text: 'Добро пожаловать в мой скромный калькулятор. Если вы хотите учебник о том, как здесь все работает, нажмите кнопку "Продолжить", если нет, нажмите "Пропустить".'
    },
    {
        text: 'Вот меню, где вы можете активировать и деактивировать пузыри, включить режим темной темы и изменить тему!'
    },
    {
        text: 'Кнопка пузырей, если она включена, покажет фон с пузырями с анимированными отражениями, но эта функция требует больших вычислительных ресурсов.'
    },
    {
        text: 'Вторая кнопка активирует темный режим.'
    },
    {
        text: 'Третья кнопка открывает список тем для выбора.'
    },
    {
        text: 'Четвертая кнопка снова открывает учебник.'
    },
    {
        text: 'Пятая кнопка открывает список со всеми доступными языками.'
    },
    {
        text: 'В этом разделе хранятся все результаты, которые вы получили с помощью операций.'
    },
    {
        text: 'Вот наш калькулятор, созданный с целью улучшить ваш опыт и сделать вычисления более интересными.'
    },
    {
        text: 'И, наконец, здесь вы можете увидеть журнал изменений проекта со всеми внесенными изменениями.'
    }
];

let worlds_pt = [
    'Calculadora', 'Menu', 'Bolhas', 'Vermelhor azul', 'Preto', 'Tutorial', 'Resultados', 'Limpar', 'Log de alterações', 'pular', 'continuar'
]
let worlds_en = [
    'Calculator', 'Menu', 'Bubbles', 'Dark blue', 'White', 'Tutorial', 'Results', 'Clear', 'Log of changes', 'skip', 'continue'
]
let worlds_es = [
    'Calculadora', 'Menu', 'Bolitas', 'Azul oscuro', 'Blanco', 'Tutorial', 'Resultados', 'Limpiar', 'Registro de cambios', 'Saltar', 'Continuar'
]
let worlds_it = [
    'Calcolatrice', 'Menu', 'Bollini', 'Modo scuro', 'Bianco', 'Tutorial', 'Risultati', 'Cancella', 'Registro di cambiamenti', 'Salta', 'Continua'
]
let worlds_fr = [
    'Calculatrice', 'Menu', 'Bulles', 'Mode sombre', 'Bleu', 'Tutorial', 'Résultats', 'Effacer', 'Journal des modifications', 'Passer', 'Continuer'
]
let worlds_nl = [
    'Calculator', 'Menu', 'Bollen', 'Dunkelblau', 'Wit', 'Tutorial', 'Resultaten', 'Wijzigen', 'Logboek', 'Terug', 'Doorgaan'
]
let worlds_pl = [
    'Kalkulator', 'Menu', 'Błaski', 'Tryb ciemny', 'Białe', 'Tutorial', 'Rzeczy', 'Wyczyść', 'Log', 'Powrót', 'Kontynuuj'
]
let worlds_de = [
    'Kalkulator', 'Menu', 'Blätter', 'Dunkel dunkelblau', 'Weiß', 'Tutorial', 'Ergebnisse', 'Löschen', 'Log', 'Zurück', 'Fortfahren'
]
let worlds_ru = [
    'Калькулятор', 'Меню', 'Бласки', 'Темная тема', 'Белый', 'Туториал', 'Результаты', 'Очистить', 'Журнал', 'Пропустить', 'Продолжить'
]
let worlds_texts = [
    worlds_pt, worlds_en, worlds_es, worlds_it, worlds_fr, worlds_nl, worlds_pl, worlds_de, worlds_ru
]