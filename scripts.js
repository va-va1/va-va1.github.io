  let currentCompatibleList = [];
let currentFilter = 'all';
const ITEMS_TO_SHOW = 10;

// --- ИНИЦИАЛИЗАЦИЯ ---
window.onload = function() {
    initHardware();
};

function initHardware() {
    console.log("Загрузка данных...");
    
    if (hardwareDatabase.cpus) fillSelect('cpu', hardwareDatabase.cpus);
    if (hardwareDatabase.mobos) fillSelect('mobo', hardwareDatabase.mobos);
    if (hardwareDatabase.gpus) fillSelect('gpu', hardwareDatabase.gpus);
    if (hardwareDatabase.rams) fillSelect('ram', hardwareDatabase.rams);
    if (hardwareDatabase.storage) fillSelect('storage', hardwareDatabase.storage);
    if (hardwareDatabase.coolers) fillSelect('cooler', hardwareDatabase.coolers);
    if (hardwareDatabase.powerSupply) fillSelect('psu', hardwareDatabase.powerSupply);
    if (hardwareDatabase.cases) fillSelect('case', hardwareDatabase.cases);
    if (hardwareDatabase.os) fillSelect('os', hardwareDatabase.os);
    
    console.log("Инициализация завершена!");
}

function fillSelect(elementId, dataArray) {
    const select = document.getElementById(elementId);
    if (!select) {
        console.log("Элемент не найден:", elementId);
        return;
    }
    
    select.innerHTML = '';
    
    dataArray.forEach((item, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = item.name;
        select.appendChild(option);
    });
    
    console.log("Заполнен:", elementId, "количество:", dataArray.length);
}

// --- ЛОГИКА КОНФИГУРАТОРА ---
function updateConfig() {
    const cpu = hardwareDatabase.cpus[document.getElementById('cpu').value];
    const mobo = hardwareDatabase.mobos[document.getElementById('mobo').value];
    const gpu = hardwareDatabase.gpus[document.getElementById('gpu').value];
    const ram = hardwareDatabase.rams[document.getElementById('ram').value];
    const storage = hardwareDatabase.storage ? hardwareDatabase.storage[document.getElementById('storage').value] : { price: 0 };
    const cooler = hardwareDatabase.coolers ? hardwareDatabase.coolers[document.getElementById('cooler').value] : { price: 0 };
    const psu = hardwareDatabase.powerSupply ? hardwareDatabase.powerSupply[document.getElementById('psu').value] : { price: 0 };
    const computerCase = hardwareDatabase.cases ? hardwareDatabase.cases[document.getElementById('case').value] : { price: 0 };
    const os = hardwareDatabase.os[document.getElementById('os').value];

    document.getElementById('price-cpu').innerText = formatPrice(cpu.price);
    document.getElementById('price-mobo').innerText = formatPrice(mobo.price);
    document.getElementById('price-gpu').innerText = formatPrice(gpu.price);
    document.getElementById('price-ram').innerText = formatPrice(ram.price);
    if (document.getElementById('price-storage')) 
        document.getElementById('price-storage').innerText = formatPrice(storage.price);
    if (document.getElementById('price-cooler')) 
        document.getElementById('price-cooler').innerText = formatPrice(cooler.price);
    if (document.getElementById('price-psu')) 
        document.getElementById('price-psu').innerText = formatPrice(psu.price);
    if (document.getElementById('price-case')) 
        document.getElementById('price-case').innerText = formatPrice(computerCase.price);
    document.getElementById('price-os').innerText = formatPrice(os.price);

    const total = cpu.price + mobo.price + gpu.price + ram.price + 
                  storage.price + cooler.price + psu.price + computerCase.price + os.price;
    document.getElementById('total-price').innerText = formatPrice(total);

    const errorBox = document.getElementById('hardware-errors');
    const checkBtn = document.getElementById('check-btn');
    let errors = [];

    if (cpu.id !== 0 && mobo.id !== 0) {
        if (cpu.socket !== mobo.socket) {
            errors.push(`❌ Несовместимость: Процессор (${cpu.socket}) не подходит к плате (${mobo.socket}).`);
        }
    }

    if (ram.id !== 0 && mobo.id !== 0) {
        if (ram.type !== mobo.ramType) {
            errors.push(`❌ Несовместимость: Плата поддерживает ${mobo.ramType}, а выбрана память ${ram.type}.`);
        }
    }

    if (errors.length > 0) {
        errorBox.style.display = 'block';
        errorBox.innerHTML = errors.join('<br>');
        if (checkBtn) checkBtn.disabled = true;
    } else {
        errorBox.style.display = 'none';
        if (checkBtn) checkBtn.disabled = false;
    }
}

function formatPrice(price) {
    return (price || 0).toLocaleString('ru-RU') + ' ₽';
}

// --- ЛОГИКА СОВМЕСТИМОСТИ ПО ---
function checkSoftwareCompatibility() {
    const cpu = hardwareDatabase.cpus[document.getElementById('cpu').value];
    const gpu = hardwareDatabase.gpus[document.getElementById('gpu').value];
    const ram = hardwareDatabase.rams[document.getElementById('ram').value];
    const os = hardwareDatabase.os[document.getElementById('os').value];

    if (cpu.id === 0 || gpu.id === 0 || ram.id === 0) {
        alert("Пожалуйста, выберите основные комплектующие (CPU, GPU, RAM).");
        return;
    }

    currentCompatibleList = [];

    softwareDatabase.forEach(app => {
        const min = app.requirements.min;
        const rec = app.requirements.rec;
        let status = "incompatible";
        let matchScore = 0;

        const osOkMin = (min.os === 0) || (os.version >= min.os);
        const osOkRec = (rec.os === 0) || (os.version >= rec.os);

        if (cpu.score >= min.cpu && gpu.score >= min.gpu && ram.size >= min.ram && osOkMin) {
            status = "minimum";
            matchScore = 1;
        }
        if (cpu.score >= rec.cpu && gpu.score >= rec.gpu && ram.size >= rec.ram && osOkRec) {
            status = "recommended";
            matchScore = 2;
        }

        if (status !== "incompatible") {
            const cpuPercent = Math.min(100, Math.round((cpu.score / rec.cpu) * 100));
            currentCompatibleList.push({ 
                ...app, 
                status: status,
                matchScore: matchScore,
                cpuPercent: cpuPercent,
                requiredCpu: rec.cpu,
                requiredGpu: rec.gpu,
                requiredRam: rec.ram
            });
        }
    });

    currentCompatibleList.sort((a, b) => {
        const gameTypes = ["Игры", "Игра"];
        const aIsGame = gameTypes.includes(a.type);
        const bIsGame = gameTypes.includes(b.type);
        
        if (aIsGame && !bIsGame) return -1;
        if (!aIsGame && bIsGame) return 1;
        
        if (a.matchScore !== b.matchScore) {
            return b.matchScore - a.matchScore;
        }
        
        return a.name.localeCompare(b.name);
    });

    const searchWrapper = document.getElementById('search-wrapper');
    if (searchWrapper) {
        searchWrapper.style.display = currentCompatibleList.length > 0 ? 'block' : 'none';
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    renderResults(currentCompatibleList);
}

function renderResults(list) {
    const resultsContainer = document.getElementById('results');
    const showMoreContainer = document.getElementById('show-more-container');
    
    if (!resultsContainer) return;
    
    resultsContainer.innerHTML = "";
    if (showMoreContainer) showMoreContainer.style.display = 'none';

    if (list.length === 0) {
        resultsContainer.innerHTML = "<p style='grid-column: 1/-1; text-align: center;'>Ничего не найдено или конфигурация слишком слабая.</p>";
        return;
    }

    list.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = `software-card ${item.status}`;
        
        if (index >= ITEMS_TO_SHOW) {
            card.classList.add('hidden-card');
        }

        let badgeHtml = '';
        let statusText = '';
        let progressHtml = '';

        if (item.status === 'recommended') {
            badgeHtml = '<span class="badge badge-rec">✅ Рекомендуется</span>';
            statusText = 'Отличная производительность';
            progressHtml = `<div class="progress-bar"><div class="progress-fill good" style="width: 100%"></div></div>`;
        } else {
            badgeHtml = '<span class="badge badge-min">⚠️ Минимальные требования</span>';
            statusText = 'Возможны низкие настройки';
            const cpuPercent = Math.min(100, Math.round((item.cpuPercent || 50)));
            progressHtml = `
                <div class="progress-bar">
                    <div class="progress-fill warn" style="width: ${cpuPercent}%"></div>
                </div>
                <small>Производительность: ~${cpuPercent}% от рекомендуемой</small>
            `;
        }

        let typeIcon = "📁";
        if (item.type === "Игры") typeIcon = "🎮";
        else if (item.type === "Графика") typeIcon = "🎨";
        else if (item.type === "Видеомонтаж") typeIcon = "🎬";
        else if (item.type === "3D Моделирование") typeIcon = "🖥️";
        else if (item.type === "Разработка") typeIcon = "💻";
        else if (item.type === "Инженерия") typeIcon = "📐";
        else if (item.type === "Офис") typeIcon = "📊";
        else if (item.type === "Связь") typeIcon = "💬";
        else if (item.type === "Стриминг") typeIcon = "📺";

        card.innerHTML = `
            <h3>${typeIcon} ${item.name}</h3>
            <p><strong>Тип:</strong> ${item.type}</p>
            ${badgeHtml}
            <div class="specs-list">
                <p>${statusText}</p>
                ${progressHtml}
                <hr>
                <small>📌 Требования: CPU ${item.requirements.min.cpu}+ / GPU ${item.requirements.min.gpu}+ / RAM ${item.requirements.min.ram}ГБ+</small>
            </div>
        `;
        resultsContainer.appendChild(card);
    });

    if (showMoreContainer && list.length > ITEMS_TO_SHOW) {
        showMoreContainer.style.display = 'block';
    }
}

function filterResults() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = currentCompatibleList.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.type.toLowerCase().includes(query)
    );
    renderResults(filtered);
}

function showAllResults() {
    const hiddenCards = document.querySelectorAll('.hidden-card');
    hiddenCards.forEach(card => {
        card.classList.remove('hidden-card');
        card.style.display = 'block';
    });
    const container = document.getElementById('show-more-container');
    if (container) container.style.display = 'none';
}

// --- ГОТОВЫЕ СБОРКИ (ПРЕСЕТЫ) ---
function loadPreset(type) {
    const cpuSelect = document.getElementById('cpu');
    const moboSelect = document.getElementById('mobo');
    const gpuSelect = document.getElementById('gpu');
    const ramSelect = document.getElementById('ram');
    const storageSelect = document.getElementById('storage');
    const coolerSelect = document.getElementById('cooler');
    const psuSelect = document.getElementById('psu');
    const caseSelect = document.getElementById('case');
    const osSelect = document.getElementById('os');
    
    switch(type) {
        case 'budget':
            cpuSelect.value = "2";
            moboSelect.value = "2";
            gpuSelect.value = "2";
            ramSelect.value = "2";
            if(storageSelect) storageSelect.value = "1";
            if(coolerSelect) coolerSelect.value = "1";
            if(psuSelect) psuSelect.value = "1";
            if(caseSelect) caseSelect.value = "1";
            osSelect.value = "3";
            break;
        case 'medium':
            cpuSelect.value = "3";
            moboSelect.value = "3";
            gpuSelect.value = "4";
            ramSelect.value = "3";
            if(storageSelect) storageSelect.value = "3";
            if(coolerSelect) coolerSelect.value = "2";
            if(psuSelect) psuSelect.value = "3";
            if(caseSelect) caseSelect.value = "2";
            osSelect.value = "3";
            break;
        case 'powerful':
            cpuSelect.value = "4";
            moboSelect.value = "2";
            gpuSelect.value = "5";
            ramSelect.value = "3";
            if(storageSelect) storageSelect.value = "3";
            if(coolerSelect) coolerSelect.value = "2";
            if(psuSelect) psuSelect.value = "3";
            if(caseSelect) caseSelect.value = "3";
            osSelect.value = "2";
            break;
        case 'workstation':
            cpuSelect.value = "6";
            moboSelect.value = "4";
            gpuSelect.value = "6";
            ramSelect.value = "9";
            if(storageSelect) storageSelect.value = "4";
            if(coolerSelect) coolerSelect.value = "3";
            if(psuSelect) psuSelect.value = "4";
            if(caseSelect) caseSelect.value = "4";
            osSelect.value = "4";
            break;
    }
    
    updateConfig();
    showPresetMessage(type);
}

function showPresetMessage(type) {
    const messages = {
        budget: '💰 Бюджетная сборка загружена! Хватит для офиса, учёбы, CS2, Dota 2.',
        medium: '⭐ Средняя сборка загружена! Хватит для любых игр, фотошопа, программирования.',
        powerful: '🔥 Мощная сборка загружена! Хватит для стримов, видеомонтажа, 3D моделирования.',
        workstation: '⚙️ Рабочая станция загружена! Хватит для Blender, AutoCAD, Premiere Pro.'
    };
    
    const msg = document.createElement('div');
    msg.textContent = messages[type] || 'Сборка загружена!';
    msg.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 1000;
        font-size: 14px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: fadeInOut 3s ease;
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}

// --- СТИЛИ (добавляются динамически) ---
const presetStyle = document.createElement('style');
presetStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(100px); }
        15% { opacity: 1; transform: translateX(0); }
        85% { opacity: 1; transform: translateX(0); }
        100% { opacity: 0; transform: translateX(100px); }
    }
    .btn-preset {
        background-color: #9b59b6;
        color: white;
        border: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
        margin: 5px;
    }
    .btn-preset:hover {
        background-color: #8e44ad;
        transform: translateY(-2px);
    }
    .progress-bar {
        width: 100%;
        height: 8px;
        background-color: #334155;
        border-radius: 4px;
        overflow: hidden;
        margin: 10px 0;
    }
    .progress-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.5s ease;
    }
    .progress-fill.good {
        background: linear-gradient(90deg, #10b981, #34d399);
    }
    .progress-fill.warn {
        background: linear-gradient(90deg, #f59e0b, #fbbf24);
    }
    .software-card h3 {
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 5px;
    }
`;
document.head.appendChild(presetStyle);

// --- ПОКАЗАТЬ ВСЁ СОВМЕСТИМОЕ ПО ---
function showAllCompatible() {
    if (currentCompatibleList.length === 0) {
        checkSoftwareCompatibility();
        setTimeout(() => {
            if (currentCompatibleList.length > 0) {
                removeHiddenLimit();
            } else {
                const msg = document.createElement('div');
                msg.textContent = '⚠️ Сначала выберите комплектующие';
                msg.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: #e67e22;
                    color: white;
                    padding: 10px 18px;
                    border-radius: 8px;
                    z-index: 1000;
                    font-size: 13px;
                    animation: fadeInOut 3s ease;
                `;
                document.body.appendChild(msg);
                setTimeout(() => msg.remove(), 3000);
            }
        }, 500);
    } else {
        removeHiddenLimit();
    }
}

function removeHiddenLimit() {
    const hiddenCards = document.querySelectorAll('.hidden-card');
    hiddenCards.forEach(card => {
        card.classList.remove('hidden-card');
        card.style.display = 'block';
    });
    
    const container = document.getElementById('show-more-container');
    if (container) container.style.display = 'none';
    
    const msg = document.createElement('div');
    msg.textContent = `📋 Показано ВСЕ (${currentCompatibleList.length} программ и игр)`;
    msg.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 10px 18px;
        border-radius: 8px;
        z-index: 1000;
        font-size: 13px;
        animation: fadeInOut 2s ease;
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 2000);
}  