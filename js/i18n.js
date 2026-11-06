/**
 * Internationalization (i18n) Engine for AClient Landing Page
 * Supported Languages: Español (es), Português (pt), English (en)
 */

const translations = {
  es: {
    // Nav
    "nav.modtools": "Mod Tools",
    "nav.gameskin": "GameSkin",
    "nav.philosophy": "Visión",
    "nav.anatomy": "Race Stats",
    "nav.sound_lab": "Fast Input",
    "nav.gallery": "Galería",
    "nav.specs": "Módulos",
    "nav.credits": "Créditos",
    "nav.download": "Download",

    // Preloader
    "preloader.status": "CARGANDO CLIENTE",

    // Hero
    "hero.badge": "ACLIENT // CLIENTE COMPETITIVO PARA DDNET",
    "hero.title1": "MENOS LATENCIA.",
    "hero.title2": "MÁS PRECISIÓN.",
    "hero.desc": "AClient lleva DDNet al siguiente nivel: motores de Fast Input, Race Stats en vivo con ranking animado, herramientas de práctica, editor de assets y un menú pensado para jugadores competitivos.",
    "hero.theme_label": "TEMA DE LA WEB:",
    "hero.btn_racestats": "Ver Race Stats",
    "hero.hint_rotate": "Girar en 360°",
    "hero.hud1_label": "Fast Input",
    "hero.hud1_unit": "motores",
    "hero.hud1_sub": "aX30, Fast, Best, Saiko, Delta, F y Cloud",
    "hero.hud2_label": "Race Stats",
    "hero.hud2_unit": "criterios",
    "hero.hud2_sub": "Ranking en vivo estilo F1 con destellos",
    "hero.hud3_label": "Editor de Assets",
    "hero.hud3_unit": "fusiones",
    "hero.hud3_sub": "TeeLike, Screen, Multiply y Overlay",
    "hero.hud4_label": "Configuración",
    "hero.hud4_unit": "propia",
    "hero.hud4_sub": "settings_aclient.cfg aislado en AppData",

    // Themes
    "theme.default": "Violeta // 01",
    "theme.fuchsia": "Fucsia // 02",
    "theme.azure": "Cian // 03",
    "theme.gold": "Dorado // 04",

    // Mod Tools
    "mod.eyebrow": "Mod Tools",
    "mod.title": "MODERACIÓN SIN FRICCIÓN",
    "mod.desc": "Herramientas para moderadores integradas en el cliente: acciones rápidas sobre cualquier jugador y presets listos para sancionar.",
    "mod.card1_title": "Menú de jugador",
    "mod.card1_sub": "Clic en un jugador y actuás al instante",
    "mod.card1_li1": "Asistir, copiar skin y abrir su perfil en DDNet, DDNet Web o KoG Web",
    "mod.card1_li2": "Sección de moderación con <strong>Mutear ID</strong>, <strong>Kickear</strong> y <strong>Banear</strong>",
    "mod.card1_li3": "Todo desde el mismo menú, sin escribir comandos",
    "mod.card2_title": "Pestaña Mod",
    "mod.card2_sub": "Presets editables para cada sanción",
    "mod.card2_li1": "Grabación automática de una demo de 3 minutos al sancionar (kick o ban)",
    "mod.card2_li2": "Presets de <strong>Kick</strong>, <strong>Mute</strong> (duraciones y razones) y <strong>Ban</strong> (duraciones en minutos y razones)",
    "mod.card2_li3": "Opción para moderar a tu Dummy (modo pruebas) y acceso directo al canal de Discord",
    "mod.card2_li4": "Restablecer valores por defecto con un clic",

    // GameSkin Others
    "gameskin.eyebrow": "GameSkinOthers",
    "gameskin.title": "LAS SKINS DE LOS DEMÁS",
    "gameskin.desc": "Mirá las skins que tienen los demás jugadores.",

    // Vision
    "vision.eyebrow": "Por qué AClient",
    "vision.title": "HECHO PARA QUIEN JUEGA EN SERIO",
    "vision.lead": "Un cliente construido sobre DDNet y TClient que <span class=\"highlight\">pone los datos y el control en tus manos</span>: input, estadísticas, práctica y personalización.",
    "vision.body": "Cada módulo responde a una necesidad real de las carreras: reaccionar con menos retraso, entender cómo corrió cada tee, practicar sin fricción y mantener tu configuración ordenada en un dominio propio, con compatibilidad hacia atrás para tus configs <code>tc_*</code>.",
    "vision.chip1": "Basado en DDNet / TClient",
    "vision.chip2": "Configuración ac_ aislada",
    "vision.chip3": "Scripts ChaiScript",
    "vision.card_title": "Panel de Entrada",
    "vision.card_sub": "Modos, offsets, interpolación y sub-tick aiming",

    // Race Stats
    "stats.eyebrow": "Race Stats",
    "stats.title": "ANALIZÁ CADA CARRERA",
    "stats.desc": "Tocá los puntos de pulso para ver qué hace cada parte del panel.",
    "stats.pin1_tag": "HISTORIAL",
    "stats.pin1_title": "Logs guardados",
    "stats.pin1_desc": "Cada carrera queda registrada con mapa, equipo, tiempo y motivo del guardado (Auto, Finish). Abrila cuando quieras.",
    "stats.pin2_tag": "TABLA EN VIVO",
    "stats.pin2_title": "Stats por jugador",
    "stats.pin2_desc": "Freezes, hammer, muertes, eficiencia, balance y tiempo de cada tee, ordenables según 8 criterios.",
    "stats.pin3_tag": "PERSISTENCIA",
    "stats.pin3_title": "Auto-guardado",
    "stats.pin3_desc": "Guardá antes de /kill o /team, al terminar el mapa, o solo al finalizar. Con duración mínima y límite de logs configurables.",
    "stats.pin4_tag": "COMPARTIR",
    "stats.pin4_title": "Export PNG",
    "stats.pin4_desc": "Exportá el resultado de la carrera como imagen para compartirlo con tu equipo.",

    // Fast Input
    "input.eyebrow": "Fast Input",
    "input.title": "SIETE MOTORES, TU ELECCIÓN",
    "input.desc": "Mové el cursor sobre la señal para jugar con la forma de la onda y elegí un motor para ver cómo cambia su ritmo. Es una ilustración: cada motor ajusta cuán rápido responde tu input.",
    "input.control_label": "MODO DE FAST INPUT:",

    // Gallery
    "gallery.eyebrow": "En acción",
    "gallery.title": "GALERÍA",
    "gallery.card1_tag": "PERFILES",
    "gallery.card1_title": "Equipos y mapas pendientes",
    "gallery.card1_desc": "Buscá jugadores en DDNet o KoG, detectá tu equipo y mirá qué mapas les faltan en común, filtrados por dificultad.",
    "gallery.card2_tag": "JUGADORES",
    "gallery.card2_title": "Menú rápido",
    "gallery.card2_desc": "Asistir, copiar skin, abrir perfiles en DDNet y KoG, y acciones de moderación en un clic.",
    "gallery.card3_tag": "MODERAÇÃO",
    "gallery.card3_title": "Presets de kick, mute y ban",
    "gallery.card3_desc": "Razones y duraciones listas para usar, con grabación automática de demo al sancionar.",
    "gallery.card4_tag": "RACE STATS",
    "gallery.card4_title": "Resultados de cada run",
    "gallery.card4_desc": "Compará jugadores en una sola tabla y exportala como imagen.",

    // Modules
    "modules.eyebrow": "Módulos",
    "modules.title": "TODO LO QUE INCLUYE",
    "modules.spec1_title": "Fast Input",
    "modules.spec1_badge": "7 motores",
    "modules.spec1_desc": "aX30, Fast, Best, Saiko, Delta, F y Cloud. Margen y offset de predicción, compensación adaptativa, interpolación y sub-tick aiming, con control independiente para otros tees y repredicción de hook.",
    "modules.spec2_title": "Race Stats & HUD",
    "modules.spec2_badge": "8 criterios",
    "modules.spec2_desc": "Detección de saves (hammer y hook), ranking animado estilo F1, HUD configurable en escala, posición y opacidad, e historial con auto-guardado.",
    "modules.spec3_title": "Fast Practice & Equipos",
    "modules.spec3_badge": "Ghost 0–100%",
    "modules.spec3_desc": "Modo fantasma regulable, auto /spec al original, auto team lock con retardo configurable y atajos /invite all e /invite friends.",
    "modules.spec4_title": "Editor de Game Assets",
    "modules.spec4_badge": "HSLA + 4 fusiones",
    "modules.spec4_desc": "Lienzo dual donante/resultado para Entities, Game, HUD, Particles, Emoticons y Extras. Reescalado bilineal, colorización y exportación PNG con recarga en caliente.",
    "modules.spec5_title": "Chat & Alertas",
    "modules.spec5_badge": "Silent Typing",
    "modules.spec5_desc": "Ocultá tu burbuja al escribir o las ajenas, controlá el echo local y recibí avisos en segundo plano al descongelarte o si tu tee se mueve estando AFK.",
    "modules.spec6_title": "Integraciones",
    "modules.spec6_badge": "Discord + ChaiScript",
    "modules.spec6_desc": "Discord Rich Presence con mapa y estado, scripts .chai para macros, personalización estética (trails, rainbow, mascotas) y configuración propia <code>ac_</code>.",
    "modules.spec7_title": "Skin Stealer",
    "modules.spec7_badge": "Copiar skins",
    "modules.spec7_desc": "Copiá la skin de cualquier jugador con un clic.",
    "modules.spec8_title": "Sonidos del juego",
    "modules.spec8_badge": "Sonido a tu gusto",
    "modules.spec8_desc": "Cambiá los sonidos del juego por los que prefieras.",

    // Credits
    "credits.eyebrow": "AGRADECIMIENTOS // COMUNIDAD",
    "credits.title": "CRÉDITOS Y RECONOCIMIENTO",
    "credits.desc": "AClient se construye gracias a innovaciones y desarrollos de la comunidad de DDNet y teeworlds.",
    "credits.nova_badge": "Live HUD",
    "credits.nova_desc": "Creador original del overlay de estadísticas en vivo que contabiliza freezes, muertes y saques en tiempo real durante la carrera.",
    "credits.bestclient_badge": "Graphic Suite",
    "credits.bestclient_desc": "Creadores del editor de assets integrado con lienzo dual y modos de fusión HSLA (TeeLike, Screen, Multiply y Overlay).",
    "credits.ddnet_badge": "Core Engine",
    "credits.ddnet_desc": "Motor base oficial de DDNet sobre el que se apoya toda la física de juego, conectividad y seguridad de red.",
    "credits.tclient_badge": "Competitive Mod",
    "credits.tclient_desc": "Inspiración y base modular para configuraciones competitivas avanzadas, integraciones y utilidades de práctica.",
    // CTA
    "cta.title": "PROBÁ ACLIENT EN TU PRÓXIMA CARRERA",
    "cta.desc": "Todo el poder de DDNet con las herramientas que te faltaban. Sumate a la comunidad y mantenete al tanto de las novedades.",
    "cta.box_sub": "COMPETITIVO",

    // Footer
    "footer.desc": "Cliente competitivo y de práctica avanzada para DDNet, creado por y para la comunidad.",
    "footer.col1": "Explorar",
    "footer.col2": "Funciones",
    "footer.col3": "Comunidad",
    "footer.nav_home": "Inicio",
    "footer.get_aclient": "Obtener AClient",
    "footer.bottom": "AClient · Proyecto de la comunidad, basado en DDNet y TClient.",
    "footer.clock": "HORA LOCAL:"
  },

  pt: {
    // Nav
    "nav.modtools": "Mod Tools",
    "nav.gameskin": "GameSkin",
    "nav.philosophy": "Visão",
    "nav.anatomy": "Race Stats",
    "nav.sound_lab": "Fast Input",
    "nav.gallery": "Galeria",
    "nav.specs": "Módulos",
    "nav.credits": "Créditos",
    "nav.download": "Download",

    // Preloader
    "preloader.status": "CARREGANDO CLIENTE",

    // Hero
    "hero.badge": "ACLIENT // CLIENTE COMPETITIVO PARA DDNET",
    "hero.title1": "MENOS LATÊNCIA.",
    "hero.title2": "MAIS PRECISÃO.",
    "hero.desc": "O AClient leva o DDNet ao próximo nível: motores de Fast Input, Race Stats ao vivo com ranking animado, ferramentas de treino, editor de assets e um menu pensado para jogadores competitivos.",
    "hero.theme_label": "TEMA DO SITE:",
    "hero.btn_racestats": "Ver Race Stats",
    "hero.hint_rotate": "Girar em 360°",
    "hero.hud1_label": "Fast Input",
    "hero.hud1_unit": "motores",
    "hero.hud1_sub": "aX30, Fast, Melhor, Saiko, Delta, F e Cloud",
    "hero.hud2_label": "Race Stats",
    "hero.hud2_unit": "critérios",
    "hero.hud2_sub": "Ranking ao vivo estilo F1 com animações",
    "hero.hud3_label": "Editor de Assets",
    "hero.hud3_unit": "fusões",
    "hero.hud3_sub": "TeeLike, Screen, Multiply e Overlay",
    "hero.hud4_label": "Configuração",
    "hero.hud4_unit": "própria",
    "hero.hud4_sub": "settings_aclient.cfg isolado no AppData",

    // Themes
    "theme.default": "Violeta // 01",
    "theme.fuchsia": "Fúcsia // 02",
    "theme.azure": "Ciano // 03",
    "theme.gold": "Dourado // 04",

    // Mod Tools
    "mod.eyebrow": "Mod Tools",
    "mod.title": "MODERAÇÃO SEM FRICÇÃO",
    "mod.desc": "Ferramentas para moderadores integradas ao cliente: ações rápidas em qualquer jogador e predefinições prontas para punição.",
    "mod.card1_title": "Menu do jogador",
    "mod.card1_sub": "Clique em um jogador e aja instantaneamente",
    "mod.card1_li1": "Assistir, copiar skin e abrir perfil no DDNet, DDNet Web ou KoG Web",
    "mod.card1_li2": "Seção de moderação com <strong>Mutar ID</strong>, <strong>Kickar</strong> e <strong>Banir</strong>",
    "mod.card1_li3": "Tudo a partir do mesmo menu, sem digitar comandos",
    "mod.card2_title": "Aba Mod",
    "mod.card2_sub": "Predefinições editáveis para cada punição",
    "mod.card2_li1": "Gravação automática de demo de 3 minutos ao punir (kick ou ban)",
    "mod.card2_li2": "Presets de <strong>Kick</strong>, <strong>Mute</strong> (durações e motivos) e <strong>Ban</strong> (durações em minutos e motivos)",
    "mod.card2_li3": "Opção para moderar seu Dummy (modo de teste) e atalho para o Discord",
    "mod.card2_li4": "Restaurar valores padrão com um clique",

    // GameSkin Others
    "gameskin.eyebrow": "GameSkinOthers",
    "gameskin.title": "AS SKINS DOS OUTROS",
    "gameskin.desc": "Veja as skins que os outros jogadores estão usando.",

    // Vision
    "vision.eyebrow": "Por que o AClient",
    "vision.title": "FEITO PARA QUEM JOGA A SÉRIO",
    "vision.lead": "Um cliente construído sobre DDNet e TClient que <span class=\"highlight\">coloca os dados e o controle nas suas mãos</span>: input, estatísticas, treino e personalização.",
    "vision.body": "Cada módulo atende a uma necessidade real de corrida: reagir com menos atraso, entender o desempenho de cada tee, treinar sem atrito e manter sua configuração organizada em um domínio próprio, compatível com configs <code>tc_*</code>.",
    "vision.chip1": "Baseado em DDNet / TClient",
    "vision.chip2": "Configuração ac_ isolada",
    "vision.chip3": "Scripts ChaiScript",
    "vision.card_title": "Painel de Entrada",
    "vision.card_sub": "Modos, offsets, interpolação e sub-tick aiming",

    // Race Stats
    "stats.eyebrow": "Race Stats",
    "stats.title": "ANALISE CADA CORRIDA",
    "stats.desc": "Toque nos pontos de pulso para ver o que cada parte do painel faz.",
    "stats.pin1_tag": "HISTÓRICO",
    "stats.pin1_title": "Logs salvos",
    "stats.pin1_desc": "Cada corrida fica registrada com mapa, equipe, tempo e motivo do salvamento (Auto, Finish). Abra quando quiser.",
    "stats.pin2_tag": "TABELA AO VIVO",
    "stats.pin2_title": "Stats por jogador",
    "stats.pin2_desc": "Freezes, hammer, mortes, eficiência, saldo e tempo de cada tee, ordenáveis por 8 critérios.",
    "stats.pin3_tag": "PERSISTÊNCIA",
    "stats.pin3_title": "Auto-salvamento",
    "stats.pin3_desc": "Salve antes de /kill ou /team, ao terminar o mapa, ou apenas ao finalizar. Com duração mínima e limite de logs ajustáveis.",
    "stats.pin4_tag": "COMPARTILHAR",
    "stats.pin4_title": "Exportar PNG",
    "stats.pin4_desc": "Exporte o resultado da corrida como imagem para compartilhar com sua equipe.",

    // Fast Input
    "input.eyebrow": "Fast Input",
    "input.title": "SETE MOTORES, SUA ESCOLHA",
    "input.desc": "Mova o cursor sobre o sinal para modular a onda e selecione um motor para ver a frequência mudar. É uma ilustração: cada motor ajusta a rapidez de resposta do seu input.",
    "input.control_label": "MODO DE FAST INPUT:",

    // Gallery
    "gallery.eyebrow": "Em ação",
    "gallery.title": "GALERIA",
    "gallery.card1_tag": "PERFIS",
    "gallery.card1_title": "Equipes e mapas pendentes",
    "gallery.card1_desc": "Procure jogadores no DDNet ou KoG, detecte sua equipe e veja quais mapas faltam em comum, filtrados por dificuldade.",
    "gallery.card2_tag": "JOGADORES",
    "gallery.card2_title": "Menu rápido",
    "gallery.card2_desc": "Assistir, copiar skin, abrir perfis no DDNet e KoG, e ações de moderação em um clique.",
    "gallery.card3_tag": "MODERAÇÃO",
    "gallery.card3_title": "Presets de kick, mute e ban",
    "gallery.card3_desc": "Motivos e durações prontas para uso, com gravação automática de demo ao punir.",
    "gallery.card4_tag": "RACE STATS",
    "gallery.card4_title": "Resultados de cada run",
    "gallery.card4_desc": "Compare jogadores em uma única tabela e exporte como imagem.",

    // Modules
    "modules.eyebrow": "Módulos",
    "modules.title": "TUDO O QUE ESTÁ INCLUSO",
    "modules.spec1_title": "Fast Input",
    "modules.spec1_badge": "7 motores",
    "modules.spec1_desc": "aX30, Fast, Melhor, Saiko, Delta, F e Cloud. Margem e offset de predição, compensação adaptativa, interpolação e sub-tick aiming, com controle para outros tees e repredição de hook.",
    "modules.spec2_title": "Race Stats & HUD",
    "modules.spec2_badge": "8 critérios",
    "modules.spec2_desc": "Detecção de saves (hammer e hook), ranking animado estilo F1, HUD configurável em escala, posição e opacidade, e histórico com auto-salvamento.",
    "modules.spec3_title": "Fast Practice & Equipes",
    "modules.spec3_badge": "Ghost 0–100%",
    "modules.spec3_desc": "Modo fantasma regulável, auto /spec para o original, auto team lock com atraso configurável e atalhos /invite all e /invite friends.",
    "modules.spec4_title": "Editor de Game Assets",
    "modules.spec4_badge": "HSLA + 4 fusões",
    "modules.spec4_desc": "Lienzo duplo doador/resultado para Entities, Game, HUD, Particles, Emoticons e Extras. Reescalonamento bilinear, colorização e exportação PNG.",
    "modules.spec5_title": "Chat & Alertas",
    "modules.spec5_badge": "Silent Typing",
    "modules.spec5_desc": "Oculte seu balão ao digitar ou os de terceiros, controle o echo local e receba avisos em segundo plano ao descongelar ou se mover estando AFK.",
    "modules.spec6_title": "Integrações",
    "modules.spec6_badge": "Discord + ChaiScript",
    "modules.spec6_desc": "Discord Rich Presence com mapa e status, scripts .chai para macros, personalização estética (trails, rainbow, mascotes) e configuração própria <code>ac_</code>.",
    "modules.spec7_title": "Skin Stealer",
    "modules.spec7_badge": "Copiar skins",
    "modules.spec7_desc": "Copie a skin de qualquer jogador com apenas um clique.",
    "modules.spec8_title": "Sons do jogo",
    "modules.spec8_badge": "Som ao seu gosto",
    "modules.spec8_desc": "Altere os sons do jogo para os que você preferir.",

    // Credits
    "credits.eyebrow": "AGRADECIMENTOS // COMUNIDADE",
    "credits.title": "CRÉDITOS E RECONHECIMENTO",
    "credits.desc": "O AClient é construído graças às inovações e desenvolvimentos da comunidade de DDNet e teeworlds.",
    "credits.nova_badge": "Live HUD",
    "credits.nova_desc": "Criador original do overlay de estatísticas em tempo real que contabiliza freezes, mortes e saques durante a corrida.",
    "credits.bestclient_badge": "Graphic Suite",
    "credits.bestclient_desc": "Criadores do editor de assets integrado com tela dupla e modos de mesclagem HSLA (TeeLike, Screen, Multiply e Overlay).",
    "credits.ddnet_badge": "Core Engine",
    "credits.ddnet_desc": "Motor base oficial do DDNet no qual toda a física do jogo, conectividade e segurança de rede se apoiam.",
    "credits.tclient_badge": "Competitive Mod",
    "credits.tclient_desc": "Inspiração e base modular para configurações competitivas avançadas, integrações e ferramentas de treino.",
    // CTA
    "cta.title": "EXPERIMENTE O ACLIENT NA SUA PRÓXIMA CORRIDA",
    "cta.desc": "Todo o poder do DDNet com as ferramentas que faltavam. Junte-se à comunidade e fique por dentro das novidades.",
    "cta.box_sub": "COMPETITIVO",

    // Footer
    "footer.desc": "Cliente competitivo e de treino avançado para DDNet, criado pela e para a comunidade.",
    "footer.col1": "Explorar",
    "footer.col2": "Recursos",
    "footer.col3": "Comunidade",
    "footer.nav_home": "Início",
    "footer.get_aclient": "Obter AClient",
    "footer.bottom": "AClient · Projeto comunitário, baseado em DDNet e TClient.",
    "footer.clock": "HORA LOCAL:"
  },

  en: {
    // Nav
    "nav.modtools": "Mod Tools",
    "nav.gameskin": "GameSkin",
    "nav.philosophy": "Vision",
    "nav.anatomy": "Race Stats",
    "nav.sound_lab": "Fast Input",
    "nav.gallery": "Gallery",
    "nav.specs": "Modules",
    "nav.credits": "Credits",
    "nav.download": "Download",

    // Preloader
    "preloader.status": "LOADING CLIENT",

    // Hero
    "hero.badge": "ACLIENT // COMPETITIVE CLIENT FOR DDNET",
    "hero.title1": "LESS LATENCY.",
    "hero.title2": "MORE PRECISION.",
    "hero.desc": "AClient elevates DDNet to the next level: Fast Input engines, live Race Stats with animated ranking, practice tools, asset editor, and a menu engineered for competitive players.",
    "hero.theme_label": "WEB THEME:",
    "hero.btn_racestats": "View Race Stats",
    "hero.hint_rotate": "Rotate in 360°",
    "hero.hud1_label": "Fast Input",
    "hero.hud1_unit": "engines",
    "hero.hud1_sub": "aX30, Fast, Best, Saiko, Delta, F, and Cloud",
    "hero.hud2_label": "Race Stats",
    "hero.hud2_unit": "criteria",
    "hero.hud2_sub": "Live F1-style ranking with overtake flashes",
    "hero.hud3_label": "Assets Editor",
    "hero.hud3_unit": "blend modes",
    "hero.hud3_sub": "TeeLike, Screen, Multiply, and Overlay",
    "hero.hud4_label": "Configuration",
    "hero.hud4_unit": "domain",
    "hero.hud4_sub": "isolated settings_aclient.cfg in AppData",

    // Themes
    "theme.default": "Violet // 01",
    "theme.fuchsia": "Fuchsia // 02",
    "theme.azure": "Cyan // 03",
    "theme.gold": "Golden // 04",

    // Mod Tools
    "mod.eyebrow": "Mod Tools",
    "mod.title": "FRICTIONLESS MODERATION",
    "mod.desc": "In-client moderator tools: quick actions on any player and configurable punishment presets.",
    "mod.card1_title": "Player menu",
    "mod.card1_sub": "Click on any player and act instantly",
    "mod.card1_li1": "Spectate, copy skin, and open profiles on DDNet, DDNet Web, or KoG Web",
    "mod.card1_li2": "Moderation section with <strong>Mute ID</strong>, <strong>Kick</strong>, and <strong>Ban</strong>",
    "mod.card1_li3": "Everything right from the menu without typing console commands",
    "mod.card2_title": "Mod tab",
    "mod.card2_sub": "Editable presets for every sanction",
    "mod.card2_li1": "Auto-record a 3-minute demo upon punishment (kick or ban)",
    "mod.card2_li2": "Presets for <strong>Kick</strong>, <strong>Mute</strong> (durations & reasons), and <strong>Ban</strong> (durations in minutes & reasons)",
    "mod.card2_li3": "Option to moderate your Dummy (test mode) and shortcut to the Discord channel",
    "mod.card2_li4": "Reset to default values with one click",

    // GameSkin Others
    "gameskin.eyebrow": "GameSkinOthers",
    "gameskin.title": "OTHER PLAYERS' SKINS",
    "gameskin.desc": "See the skins and weapon visuals other players are using.",

    // Vision
    "vision.eyebrow": "Why AClient",
    "vision.title": "BUILT FOR SERIOUS PLAYERS",
    "vision.lead": "A client crafted on DDNet and TClient that <span class=\"highlight\">puts telemetry and control in your hands</span>: input, stats, practice, and visual customization.",
    "vision.body": "Every module solves a real racing demand: lower input latency, analyze team performance, practice friction-free, and keep your config cleanly isolated in a dedicated domain with backward compatibility for <code>tc_*</code> binds.",
    "vision.chip1": "Based on DDNet / TClient",
    "vision.chip2": "Isolated ac_ configuration",
    "vision.chip3": "ChaiScript engine",
    "vision.card_title": "Input Panel",
    "vision.card_sub": "Modes, offsets, interpolation, and sub-tick aiming",

    // Race Stats
    "stats.eyebrow": "Race Stats",
    "stats.title": "ANALYZE EVERY RUN",
    "stats.desc": "Click or tap pulse nodes to inspect each component of the interface.",
    "stats.pin1_tag": "HISTORY",
    "stats.pin1_title": "Saved run logs",
    "stats.pin1_desc": "Every race is logged with map, team, time, and save reason (Auto, Finish). Open and review anytime.",
    "stats.pin2_tag": "LIVE TABLE",
    "stats.pin2_title": "Per-player stats",
    "stats.pin2_desc": "Freezes, hammers, deaths, efficiency, balance, and time for each tee, sortable across 8 criteria.",
    "stats.pin3_tag": "PERSISTENCE",
    "stats.pin3_title": "Auto-save",
    "stats.pin3_desc": "Save before /kill or /team, on map finish, or only on completion. Configurable minimum duration and log limits.",
    "stats.pin4_tag": "SHARE",
    "stats.pin4_title": "Export PNG",
    "stats.pin4_desc": "Export complete run stats as a clean image to share with your team.",

    // Fast Input
    "input.eyebrow": "Fast Input",
    "input.title": "SEVEN ENGINES, YOUR CHOICE",
    "input.desc": "Move your cursor across the signal to modulate the wave and select an engine to observe frequency changes. An interactive visualization of input responsiveness.",
    "input.control_label": "FAST INPUT ENGINE:",

    // Gallery
    "gallery.eyebrow": "In action",
    "gallery.title": "GALLERY",
    "gallery.card1_tag": "PROFILES",
    "gallery.card1_title": "Teams & missing maps",
    "gallery.card1_desc": "Look up players on DDNet or KoG, auto-detect your active team, and see unfinished maps in common filtered by difficulty.",
    "gallery.card2_tag": "PLAYERS",
    "gallery.card2_title": "Quick menu",
    "gallery.card2_desc": "Spectate, copy skin, view web profiles, and execute moderation actions in a single click.",
    "gallery.card3_tag": "MODERATION",
    "gallery.card3_title": "Kick, mute & ban presets",
    "gallery.card3_desc": "Configured reasons and durations, complete with automatic 3-minute demo recording.",
    "gallery.card4_tag": "RACE STATS",
    "gallery.card4_title": "Run results",
    "gallery.card4_desc": "Benchmark teammates side-by-side in a single table and export as a graphic.",

    // Modules
    "modules.eyebrow": "Modules",
    "modules.title": "EVERYTHING INCLUDED",
    "modules.spec1_title": "Fast Input",
    "modules.spec1_badge": "7 engines",
    "modules.spec1_desc": "aX30, Fast, Best, Saiko, Delta, F, and Cloud. Prediction margin & offset, adaptive smart compensation, interpolation, sub-tick aiming, independent others' control, and hook reprediction.",
    "modules.spec2_title": "Race Stats & HUD",
    "modules.spec2_badge": "8 criteria",
    "modules.spec2_desc": "Dual hammer & hook save detection, F1-style animated position ladder, configurable scale, position, and opacity, plus persistent auto-save logging.",
    "modules.spec3_title": "Fast Practice & Teams",
    "modules.spec3_badge": "Ghost 0–100%",
    "modules.spec3_desc": "Adjustable ghost transparency, automatic /spec to original tee, timed auto-team lock, and rapid /invite all and /invite friends macros.",
    "modules.spec4_title": "Game Assets Editor",
    "modules.spec4_badge": "HSLA + 4 blend modes",
    "modules.spec4_desc": "Dual donor/result canvas for Entities, Game, HUD, Particles, Emotes, and Extras. Bilinear resampling, HSLA recoloring, and live hot-reloaded PNG export.",
    "modules.spec5_title": "Chat & Alerts",
    "modules.spec5_badge": "Silent Typing",
    "modules.spec5_desc": "Hide your typing bubble or suppress others' bubbles, filter local echo, and receive desktop alerts when unfreezing or moved while AFK.",
    "modules.spec6_title": "Integrations",
    "modules.spec6_badge": "Discord + ChaiScript",
    "modules.spec6_desc": "Discord Rich Presence with map state, .chai scripting support, visual extras (trails, rainbow, pets), and dedicated <code>ac_</code> settings isolation.",
    "modules.spec7_title": "Skin Stealer",
    "modules.spec7_badge": "Copy skins",
    "modules.spec7_desc": "Copy any player's skin in-game with a single click.",
    "modules.spec8_title": "In-Game Audio",
    "modules.spec8_badge": "Custom soundscape",
    "modules.spec8_desc": "Customize game sounds and sound effects to your exact preference.",

    // Credits
    "credits.eyebrow": "ACKNOWLEDGEMENTS // COMMUNITY",
    "credits.title": "CREDITS & ATTRIBUTION",
    "credits.desc": "AClient is built on the shoulders of innovators across the DDNet and teeworlds competitive communities.",
    "credits.nova_badge": "Live HUD",
    "credits.nova_desc": "Original author of the real-time race stats overlay tracking freezes, deaths, and rescues (saques) during runs.",
    "credits.bestclient_badge": "Graphic Suite",
    "credits.bestclient_desc": "Creators of the integrated asset editor featuring dual canvas workflows and HSLA blend modes (TeeLike, Screen, Multiply, Overlay).",
    "credits.ddnet_badge": "Core Engine",
    "credits.ddnet_desc": "Official DDNet core engine powering the movement physics, high-tick netcode, and competitive fairness.",
    "credits.tclient_badge": "Competitive Mod",
    "credits.tclient_desc": "Inspiration and architectural base for advanced competitive cvars, client tooling, and practice features.",
    // CTA
    "cta.title": "TRY ACLIENT IN YOUR NEXT RUN",
    "cta.desc": "All the power of DDNet with the competitive edge you were missing. Join the community and stay tuned for releases.",
    "cta.box_sub": "COMPETITIVE",

    // Footer
    "footer.desc": "Competitive and advanced practice client for DDNet, crafted by and for the community.",
    "footer.col1": "Explore",
    "footer.col2": "Features",
    "footer.col3": "Community",
    "footer.nav_home": "Home",
    "footer.get_aclient": "Get AClient",
    "footer.bottom": "AClient · Community project based on DDNet and TClient.",
    "footer.clock": "LOCAL TIME:"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('aclient_lang') || 'es';
    if (!translations[this.currentLang]) {
      this.currentLang = 'es';
    }
  }

  init() {
    this.setupDropdown();
    this.applyLanguage(this.currentLang);
  }

  setupDropdown() {
    const toggleBtn = document.getElementById('langToggleBtn');
    const menu = document.getElementById('langMenu');
    const options = document.querySelectorAll('.lang-option');

    if (!toggleBtn || !menu) return;

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.contains('active');
      if (isOpen) {
        menu.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        menu.classList.add('active');
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });

    document.addEventListener('click', () => {
      menu.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const lang = opt.getAttribute('data-lang');
        if (lang && translations[lang]) {
          this.setLanguage(lang);
        }
      });
    });
  }

  setLanguage(lang) {
    if (!translations[lang]) return;
    this.currentLang = lang;
    localStorage.setItem('aclient_lang', lang);
    this.applyLanguage(lang);
  }

  applyLanguage(lang) {
    document.documentElement.lang = lang;
    const dict = translations[lang];
    if (!dict) return;

    // Update current lang indicator
    const currentCode = document.getElementById('currentLangCode');
    if (currentCode) {
      currentCode.textContent = lang.toUpperCase();
    }

    // Update active state in menu options
    const options = document.querySelectorAll('.lang-option');
    options.forEach(opt => {
      if (opt.getAttribute('data-lang') === lang) {
        opt.classList.add('active');
      } else {
        opt.classList.remove('active');
      }
    });

    // Translate all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Translate elements with HTML (data-i18n-html)
    const htmlElements = document.querySelectorAll('[data-i18n-html]');
    htmlElements.forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Translate active theme label if present
    const activeFinish = document.querySelector('.finish-swatch.active');
    if (activeFinish) {
      const finishKey = activeFinish.getAttribute('data-finish') || 'default';
      const activeNameEl = document.querySelector('.active-name');
      if (activeNameEl && dict[`theme.${finishKey}`]) {
        activeNameEl.textContent = dict[`theme.${finishKey}`];
      }
    }
  }

  getTranslation(key) {
    const dict = translations[this.currentLang] || translations.es;
    return dict[key] || '';
  }
}

window.I18nManager = I18nManager;
window.translations = translations;
