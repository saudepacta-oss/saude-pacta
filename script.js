    const defaultConfig = {
            hospital_name: "Pacta Saúde",
            hero_title: "Cuidando da sua saúde com excelência",
            hero_subtitle: "Atendimento humanizado e tecnologia de ponta para você e sua família",
            primary_color: "#0066cc",
            font_family: "Segoe UI",
            font_size: 16
        };

        async function onConfigChange(config) {
            const hospitalName = config.hospital_name || defaultConfig.hospital_name;
            const heroTitle = config.hero_title || defaultConfig.hero_title;
            const heroSubtitle = config.hero_subtitle || defaultConfig.hero_subtitle;

            document.getElementById('hospital-name').textContent = hospitalName;
            document.getElementById('hero-title').textContent = heroTitle;
            document.getElementById('hero-subtitle').textContent = heroSubtitle;

            const customFont = config.font_family || defaultConfig.font_family;
            const baseFontStack = 'Tahoma, Geneva, Verdana, sans-serif';
            document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;

            const baseSize = config.font_size || defaultConfig.font_size;
            document.body.style.fontSize = `${baseSize}px`;
            document.querySelectorAll('.hero h1').forEach(el => {
                el.style.fontSize = `${baseSize * 3}px`;
            });
            document.querySelectorAll('.hero p').forEach(el => {
                el.style.fontSize = `${baseSize * 1.375}px`;
            });
            document.querySelectorAll('.section-title').forEach(el => {
                el.style.fontSize = `${baseSize * 2.25}px`;
            });
        }

        function mapToCapabilities(config) {
            return {
                recolorables: [
                    {
                        get: () => config.primary_color || defaultConfig.primary_color,
                        set: (value) => {
                            config.primary_color = value;
                            window.elementSdk.setConfig({ primary_color: value });
                        }
                    }
                ],
                borderables: [],
                fontEditable: {
                    get: () => config.font_family || defaultConfig.font_family,
                    set: (value) => {
                        config.font_family = value;
                        window.elementSdk.setConfig({ font_family: value });
                    }
                },
                fontSizeable: {
                    get: () => config.font_size || defaultConfig.font_size,
                    set: (value) => {
                        config.font_size = value;
                        window.elementSdk.setConfig({ font_size: value });
                    }
                }
            };
        }

        function mapToEditPanelValues(config) {
            return new Map([
                ["hospital_name", config.hospital_name || defaultConfig.hospital_name],
                ["hero_title", config.hero_title || defaultConfig.hero_title],
                ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle]
            ]);
        }

        if (window.elementSdk) {
            window.elementSdk.init({
                defaultConfig,
                onConfigChange,
                mapToCapabilities,
                mapToEditPanelValues
            });
        }

        // Navigation System
        function navigateTo(pageId) {
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => link.classList.remove('active'));

            window.scrollTo({ top: 0, behavior: 'smooth' });

            const nav = document.getElementById('mainNav');
            nav.classList.remove('active');
        }

        function toggleMenu() {
            const nav = document.getElementById('mainNav');
            nav.classList.toggle('active');
        }

        function showInfo(type) {
            const messages = {
                resultados: 'Acesse seus resultados de exames com segurança através do nosso portal online. Para mais informações, entre em contato.',
                planos: 'Trabalhamos com os principais planos de saúde do mercado. Entre em contato conosco para saber mais sobre convênios aceitos.'
            };

            const messageDiv = document.createElement('div');
            messageDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                z-index: 10000;
                max-width: 400px;
                text-align: center;
            `;
            messageDiv.innerHTML = `
                <p style="margin-bottom: 20px; font-size: 16px; color: #333;">${messages[type]}</p>
                <button onclick="this.parentElement.remove()" class="btn btn-primary">Fechar</button>
            `;
            document.body.appendChild(messageDiv);
        }

        // Time Slot Selection
        let selectedTimeValue = '';

        function selectTime(element, time) {
            document.querySelectorAll('.time-slot').forEach(slot => {
                slot.classList.remove('selected');
            });
            element.classList.add('selected');
            selectedTimeValue = time;
            document.getElementById('selected-time').value = time;
        }

        // Form Handlers
        function handleAgendamento(event) {
            event.preventDefault();
            
            if (!selectedTimeValue) {
                const messageDiv = document.createElement('div');
                messageDiv.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #fff3cd;
                    color: #856404;
                    padding: 20px 30px;
                    border-radius: 10px;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                    z-index: 10000;
                    text-align: center;
                `;
                messageDiv.innerHTML = `
                    <p style="margin-bottom: 15px;">⚠️ Por favor, selecione um horário!</p>
                    <button onclick="this.parentElement.remove()" class="btn btn-primary">OK</button>
                `;
                document.body.appendChild(messageDiv);
                return;
            }

            const form = document.getElementById('agendamentoForm');
            const successMessage = document.getElementById('agendSuccessMessage');
            
            successMessage.style.display = 'block';
            form.reset();
            selectedTimeValue = '';
            document.querySelectorAll('.time-slot').forEach(slot => {
                slot.classList.remove('selected');
            });
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }

        function handleContact(event) {
            event.preventDefault();
            
            const form = document.getElementById('contactForm');
            const successMessage = document.getElementById('contactSuccessMessage');
            
            successMessage.style.display = 'block';
            form.reset();
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }