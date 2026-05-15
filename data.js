// --- БАЗА ДАННЫХ КОМПЛЕКТУЮЩИХ ---
const hardwareDatabase = {
    cpus: [
        { id: 0, name: "Выберите процессор...", score: 0, price: 0, socket: null },
        { id: 1, name: "Intel Celeron G5905 (Офис)", score: 10, price: 4500, socket: "LGA1200" },
        { id: 2, name: "AMD Ryzen 3 3200G (Бюджет)", score: 30, price: 8000, socket: "AM4" },
        { id: 3, name: "Intel Core i5-12400F (Средний)", score: 60, price: 14000, socket: "LGA1700" },
        { id: 4, name: "AMD Ryzen 5 5600X (Средний)", score: 65, price: 13500, socket: "AM4" },
        { id: 5, name: "Intel Core i7-13700K (Мощный)", score: 90, price: 38000, socket: "LGA1700" },
        { id: 6, name: "AMD Ryzen 9 7950X (Топовый)", score: 120, price: 55000, socket: "AM5" }
    ],
    mobos: [
        { id: 0, name: "Выберите мат. плату...", price: 0, socket: null, ramType: null },
        { id: 1, name: "ASUS Prime H510M (LGA1200, DDR4)", price: 7000, socket: "LGA1200", ramType: "DDR4" },
        { id: 2, name: "Gigabyte B450M (AM4, DDR4)", price: 8500, socket: "AM4", ramType: "DDR4" },
        { id: 3, name: "MSI PRO B660M (LGA1700, DDR4)", price: 11000, socket: "LGA1700", ramType: "DDR4" },
        { id: 4, name: "MSI MAG B650 (AM5, DDR5)", price: 18000, socket: "AM5", ramType: "DDR5" },
        { id: 5, name: "ASUS ROG Strix Z790 (LGA1700, DDR5)", price: 35000, socket: "LGA1700", ramType: "DDR5" }
    ],
    gpus: [
    { id: 0, name: "Выберите видеокарту...", score: 0, price: 0 },
    { id: 1, name: "Встроенная графика", score: 10, price: 0 },
    
    // До 20 000 ₽
    { id: 2, name: "NVIDIA GTX 1650", score: 30, price: 15000 },
    
    // 20 000 - 40 000 ₽
    { id: 3, name: "AMD Radeon RX 6600", score: 60, price: 24000 },
    { id: 4, name: "NVIDIA RTX 3060", score: 65, price: 28000 },
    { id: 5, name: "NVIDIA RTX 4060", score: 70, price: 32000 },
    { id: 6, name: "AMD Radeon RX 6700 XT", score: 75, price: 35000 },
    
    // 40 000 - 60 000 ₽
    { id: 7, name: "NVIDIA RTX 5060 (2026)", score: 85, price: 47000 },
    { id: 8, name: "NVIDIA RTX 4070", score: 90, price: 55000 },
    { id: 9, name: "AMD Radeon RX 7800 XT", score: 95, price: 55000 },
    
    // 60 000 - 100 000 ₽
    { id: 10, name: "NVIDIA RTX 5070 (2026)", score: 105, price: 65000 },
    { id: 11, name: "NVIDIA RTX 4070 Ti", score: 95, price: 85000 },
    { id: 12, name: "AMD Radeon RX 7900 XTX", score: 130, price: 100000 },
    
    // 100 000 - 200 000 ₽
    { id: 13, name: "NVIDIA RTX 4080 Super", score: 120, price: 120000 },
    { id: 14, name: "NVIDIA RTX 4090", score: 135, price: 200000 },
    
    // 200 000+ ₽
    { id: 15, name: "NVIDIA RTX 5090 (2026)", score: 160, price: 300000 }
],
    rams: [
    { id: 0, name: "Выберите память...", size: 0, price: 0, type: null },
    { id: 1, name: "Samsung 8 GB DDR4", size: 8, price: 2500, type: "DDR4" },
    { id: 2, name: "Kingston Fury 16 GB DDR4", size: 16, price: 5000, type: "DDR4" },
    { id: 3, name: "Corsair Vengeance 16 GB DDR4", size: 16, price: 4800, type: "DDR4" },
    { id: 4, name: "G.Skill Ripjaws 32 GB DDR4", size: 32, price: 9000, type: "DDR4" },
    { id: 5, name: "Crucial Ballistix 32 GB DDR4", size: 32, price: 8800, type: "DDR4" },
    { id: 6, name: "Corsair Vengeance 16 GB DDR5", size: 16, price: 7000, type: "DDR5" },
    { id: 7, name: "Kingston Fury 32 GB DDR5", size: 32, price: 13500, type: "DDR5" },
    { id: 8, name: "G.Skill Trident 32 GB DDR5", size: 32, price: 14000, type: "DDR5" },
    { id: 9, name: "Corsair Dominator 64 GB DDR5", size: 64, price: 26000, type: "DDR5" }
],
    storage: [
        { id: 0, name: "Выберите накопитель...", size: 0, price: 0, type: null },
        { id: 1, name: "SSD 256GB SATA", size: 256, price: 2000, type: "SATA" },
        { id: 2, name: "SSD 512GB NVMe", size: 512, price: 3500, type: "NVMe" },
        { id: 3, name: "SSD 1TB NVMe", size: 1024, price: 5500, type: "NVMe" },
        { id: 4, name: "SSD 2TB NVMe", size: 2048, price: 10000, type: "NVMe" }
    ],
    coolers: [
        { id: 0, name: "Выберите охлаждение...", price: 0, tdp: 0 },
        { id: 1, name: "Стандартное (боксовое)", price: 0, tdp: 65 },
        { id: 2, name: "Deepcool AK400", price: 3000, tdp: 220 },
        { id: 3, name: "Noctua NH-D15", price: 9000, tdp: 250 }
    ],
    powerSupply: [
        { id: 0, name: "Выберите БП...", price: 0, wattage: 0 },
        { id: 1, name: "500W 80+ Bronze", price: 4000, wattage: 500 },
        { id: 2, name: "650W 80+ Gold", price: 7000, wattage: 650 },
        { id: 3, name: "750W 80+ Gold", price: 9000, wattage: 750 },
        { id: 4, name: "850W 80+ Gold", price: 12000, wattage: 850 }
    ],
    cases: [
        { id: 0, name: "Выберите корпус...", price: 0 },
        { id: 1, name: "Montech X3 Glass", price: 4500 },
        { id: 2, name: "Montech Air 1000 Lite", price: 5500 },
        { id: 3, name: "DEEPCOOL CG530 4F", price: 6000 },
        { id: 4, name: "Montech Sky Two", price: 8000 }
    ],
    os: [
    { id: 0, name: "Выберите ОС...", version: 0, price: 0 },
    { id: 1, name: "Windows 10 Home", version: 10, price: 12000 },
    { id: 2, name: "Windows 10 Pro", version: 10, price: 15000 },
    { id: 3, name: "Windows 11 Home", version: 11, price: 14000 },
    { id: 4, name: "Windows 11 Pro", version: 11, price: 17000 },
    { id: 5, name: "Ubuntu 24.04 LTS (Linux)", version: 0, price: 0 },
    { id: 6, name: "Linux Mint", version: 0, price: 0 },
    { id: 7, name: "Fedora Workstation", version: 0, price: 0 },
    { id: 8, name: "Debian 12", version: 0, price: 0 },
    { id: 9, name: "macOS (Hackintosh)", version: 13, price: 0 },
    { id: 10, name: "Без ОС (DOS)", version: 0, price: 0 }
]
};

// --- БАЗА ДАННЫХ ПО ---
const softwareDatabase = [
    { name: "Microsoft Office 2021", type: "Офис", requirements: { min: { cpu: 10, gpu: 10, ram: 4, os: 10 }, rec: { cpu: 30, gpu: 10, ram: 8, os: 10 } } },
    { name: "Google Chrome", type: "Браузер", requirements: { min: { cpu: 10, gpu: 10, ram: 4, os: 0 }, rec: { cpu: 30, gpu: 10, ram: 8, os: 10 } } },
    { name: "Adobe Photoshop 2024", type: "Графика", requirements: { min: { cpu: 30, gpu: 30, ram: 8, os: 10 }, rec: { cpu: 60, gpu: 60, ram: 16, os: 11 } } },
    { name: "Counter-Strike 2", type: "Игры", requirements: { min: { cpu: 30, gpu: 30, ram: 8, os: 10 }, rec: { cpu: 60, gpu: 60, ram: 16, os: 10 } } },
    { name: "Cyberpunk 2077", type: "Игры", requirements: { min: { cpu: 60, gpu: 60, ram: 16, os: 10 }, rec: { cpu: 90, gpu: 90, ram: 32, os: 11 } } },
    { name: "Blender 3D", type: "3D Моделирование", requirements: { min: { cpu: 30, gpu: 30, ram: 8, os: 10 }, rec: { cpu: 90, gpu: 90, ram: 32, os: 10 } } },
    { name: "GTA V", type: "Игры", requirements: { min: { cpu: 30, gpu: 30, ram: 8, os: 7 }, rec: { cpu: 60, gpu: 60, ram: 16, os: 10 } } },
    { name: "Visual Studio Code", type: "Разработка", requirements: { min: { cpu: 10, gpu: 10, ram: 4, os: 0 }, rec: { cpu: 30, gpu: 10, ram: 8, os: 10 } } },
    { name: "Dota 2", type: "Игры", requirements: { min: { cpu: 30, gpu: 10, ram: 4, os: 7 }, rec: { cpu: 60, gpu: 30, ram: 8, os: 10 } } },
    { name: "AutoCAD 2024", type: "Инженерия", requirements: { min: { cpu: 60, gpu: 30, ram: 8, os: 10 }, rec: { cpu: 90, gpu: 60, ram: 16, os: 11 } } },
    { name: "Hogwarts Legacy", type: "Игры", requirements: { min: { cpu: 60, gpu: 60, ram: 16, os: 10 }, rec: { cpu: 90, gpu: 70, ram: 32, os: 11 } } },
    { name: "Zoom", type: "Связь", requirements: { min: { cpu: 10, gpu: 10, ram: 4, os: 0 }, rec: { cpu: 30, gpu: 10, ram: 8, os: 10 } } },
    { name: "Call of Duty: Black Ops 6", type: "Игры", requirements: { min: { cpu: 45, gpu: 65, ram: 8, os: 10 }, rec: { cpu: 90, gpu: 105, ram: 16, os: 11 } } },
    { name: "Fortnite", type: "Игры", requirements: { min: { cpu: 30, gpu: 30, ram: 8, os: 10 }, rec: { cpu: 70, gpu: 70, ram: 16, os: 11 } } },
    { name: "Apex Legends", type: "Игры", requirements: { min: { cpu: 30, gpu: 40, ram: 8, os: 10 }, rec: { cpu: 60, gpu: 70, ram: 16, os: 11 } } },
    { name: "PUBG: Battlegrounds", type: "Игры", requirements: { min: { cpu: 30, gpu: 40, ram: 8, os: 10 }, rec: { cpu: 70, gpu: 70, ram: 16, os: 11 } } },
    { name: "Valorant", type: "Игры", requirements: { min: { cpu: 20, gpu: 15, ram: 4, os: 10 }, rec: { cpu: 40, gpu: 30, ram: 8, os: 11 } } },
    { name: "Overwatch 2", type: "Игры", requirements: { min: { cpu: 30, gpu: 30, ram: 6, os: 10 }, rec: { cpu: 60, gpu: 60, ram: 8, os: 11 } } },
    { name: "Rainbow Six Siege", type: "Игры", requirements: { min: { cpu: 30, gpu: 30, ram: 6, os: 10 }, rec: { cpu: 60, gpu: 60, ram: 8, os: 11 } } },
    { name: "League of Legends", type: "Игры", requirements: { min: { cpu: 15, gpu: 10, ram: 4, os: 7 }, rec: { cpu: 30, gpu: 20, ram: 8, os: 10 } } },
    { name: "Minecraft (без модов)", type: "Игры", requirements: { min: { cpu: 20, gpu: 15, ram: 4, os: 7 }, rec: { cpu: 40, gpu: 30, ram: 8, os: 10 } } },
    { name: "Minecraft с шейдерами", type: "Игры", requirements: { min: { cpu: 40, gpu: 50, ram: 8, os: 10 }, rec: { cpu: 70, gpu: 80, ram: 16, os: 11 } } },
    { name: "The Witcher 3: Wild Hunt", type: "Игры", requirements: { min: { cpu: 30, gpu: 30, ram: 6, os: 7 }, rec: { cpu: 60, gpu: 60, ram: 8, os: 10 } } },
    { name: "Red Dead Redemption 2", type: "Игры", requirements: { min: { cpu: 50, gpu: 50, ram: 8, os: 10 }, rec: { cpu: 80, gpu: 80, ram: 16, os: 11 } } },
    { name: "Elden Ring", type: "Игры", requirements: { min: { cpu: 45, gpu: 40, ram: 12, os: 10 }, rec: { cpu: 70, gpu: 70, ram: 16, os: 11 } } },
    { name: "Starfield", type: "Игры", requirements: { min: { cpu: 60, gpu: 60, ram: 16, os: 10 }, rec: { cpu: 90, gpu: 90, ram: 32, os: 11 } } },
    { name: "Baldur's Gate 3", type: "Игры", requirements: { min: { cpu: 40, gpu: 40, ram: 8, os: 10 }, rec: { cpu: 70, gpu: 70, ram: 16, os: 11 } } },
    { name: "Diablo IV", type: "Игры", requirements: { min: { cpu: 30, gpu: 30, ram: 8, os: 10 }, rec: { cpu: 60, gpu: 60, ram: 16, os: 11 } } },
    { name: "God of War Ragnarök (PC)", type: "Игры", requirements: { min: { cpu: 50, gpu: 60, ram: 16, os: 10 }, rec: { cpu: 80, gpu: 90, ram: 16, os: 11 } } },
    { name: "Spider-Man 2 (PC)", type: "Игры", requirements: { min: { cpu: 50, gpu: 60, ram: 16, os: 10 }, rec: { cpu: 80, gpu: 90, ram: 16, os: 11 } } },
    { name: "Atomic Heart", type: "Игры", requirements: { min: { cpu: 40, gpu: 40, ram: 8, os: 10 }, rec: { cpu: 70, gpu: 70, ram: 16, os: 11 } } },
    { name: "Star Wars Jedi: Survivor", type: "Игры", requirements: { min: { cpu: 40, gpu: 50, ram: 8, os: 10 }, rec: { cpu: 70, gpu: 80, ram: 16, os: 11 } } },
    { name: "Adobe Premiere Pro 2025", type: "Видеомонтаж", requirements: { min: { cpu: 60, gpu: 50, ram: 16, os: 10 }, rec: { cpu: 90, gpu: 100, ram: 32, os: 11 } } },
    { name: "DaVinci Resolve", type: "Видеомонтаж", requirements: { min: { cpu: 30, gpu: 40, ram: 16, os: 10 }, rec: { cpu: 70, gpu: 90, ram: 32, os: 11 } } },
    { name: "Adobe After Effects", type: "Видеомонтаж", requirements: { min: { cpu: 50, gpu: 40, ram: 16, os: 10 }, rec: { cpu: 90, gpu: 80, ram: 32, os: 11 } } },
    { name: "Adobe Illustrator", type: "Графика", requirements: { min: { cpu: 30, gpu: 20, ram: 8, os: 10 }, rec: { cpu: 60, gpu: 40, ram: 16, os: 11 } } },
    { name: "Figma", type: "Графика", requirements: { min: { cpu: 10, gpu: 10, ram: 4, os: 10 }, rec: { cpu: 30, gpu: 20, ram: 8, os: 11 } } },
    { name: "Autodesk 3ds Max", type: "3D Моделирование", requirements: { min: { cpu: 50, gpu: 50, ram: 16, os: 10 }, rec: { cpu: 90, gpu: 90, ram: 32, os: 11 } } },
    { name: "Cinema 4D", type: "3D Моделирование", requirements: { min: { cpu: 40, gpu: 40, ram: 8, os: 10 }, rec: { cpu: 80, gpu: 80, ram: 32, os: 11 } } },
    { name: "Unity 3D", type: "Разработка", requirements: { min: { cpu: 30, gpu: 30, ram: 8, os: 10 }, rec: { cpu: 70, gpu: 60, ram: 16, os: 11 } } },
    { name: "Unreal Engine 5", type: "Разработка", requirements: { min: { cpu: 60, gpu: 60, ram: 32, os: 10 }, rec: { cpu: 110, gpu: 105, ram: 64, os: 11 } } },
    { name: "PyCharm", type: "Разработка", requirements: { min: { cpu: 10, gpu: 10, ram: 8, os: 10 }, rec: { cpu: 40, gpu: 10, ram: 16, os: 11 } } },
    { name: "IntelliJ IDEA", type: "Разработка", requirements: { min: { cpu: 15, gpu: 10, ram: 8, os: 10 }, rec: { cpu: 50, gpu: 10, ram: 16, os: 11 } } },
    { name: "Docker Desktop", type: "Разработка", requirements: { min: { cpu: 20, gpu: 10, ram: 8, os: 10 }, rec: { cpu: 50, gpu: 10, ram: 16, os: 11 } } },
    { name: "MATLAB", type: "Инженерия", requirements: { min: { cpu: 30, gpu: 10, ram: 8, os: 10 }, rec: { cpu: 70, gpu: 30, ram: 32, os: 11 } } },
    { name: "SolidWorks", type: "Инженерия", requirements: { min: { cpu: 40, gpu: 50, ram: 16, os: 10 }, rec: { cpu: 80, gpu: 80, ram: 32, os: 11 } } },
    { name: "Revit", type: "Инженерия", requirements: { min: { cpu: 50, gpu: 40, ram: 16, os: 10 }, rec: { cpu: 90, gpu: 70, ram: 32, os: 11 } } },
    { name: "Discord", type: "Связь", requirements: { min: { cpu: 10, gpu: 10, ram: 4, os: 0 }, rec: { cpu: 30, gpu: 10, ram: 8, os: 10 } } },
    { name: "Telegram Desktop", type: "Связь", requirements: { min: { cpu: 5, gpu: 5, ram: 2, os: 0 }, rec: { cpu: 10, gpu: 10, ram: 4, os: 10 } } },
    { name: "OBS Studio", type: "Стриминг", requirements: { min: { cpu: 30, gpu: 30, ram: 8, os: 10 }, rec: { cpu: 70, gpu: 70, ram: 16, os: 11 } } },
    { name: "Streamlabs Desktop", type: "Стриминг", requirements: { min: { cpu: 40, gpu: 40, ram: 8, os: 10 }, rec: { cpu: 80, gpu: 80, ram: 16, os: 11 } } },
    { name: "Microsoft Teams", type: "Офис", requirements: { min: { cpu: 10, gpu: 10, ram: 4, os: 10 }, rec: { cpu: 30, gpu: 10, ram: 8, os: 11 } } },
    { name: "Slack", type: "Офис", requirements: { min: { cpu: 10, gpu: 10, ram: 4, os: 10 }, rec: { cpu: 20, gpu: 10, ram: 8, os: 11 } } },
    { name: "1C:Предприятие", type: "Офис", requirements: { min: { cpu: 20, gpu: 10, ram: 8, os: 10 }, rec: { cpu: 40, gpu: 10, ram: 16, os: 11 } } }
];
