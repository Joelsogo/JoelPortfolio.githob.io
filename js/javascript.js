// Theme Switching
        const body = document.body;
        const themeButtons = {
            system: document.getElementById('theme-system'),
            light: document.getElementById('theme-light'),
            dark: document.getElementById('theme-dark'),
            abodunrin: document.getElementById('theme-abodunrin'),
            buildpro: document.getElementById('theme-buildpro')
        };
        
        // Set initial theme based on system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            body.classList.add('light-mode');
        }
        
        // Theme button event listeners
        Object.keys(themeButtons).forEach(theme => {
            themeButtons[theme].addEventListener('click', () => {
                // Reset all theme attributes
                body.classList.remove('light-mode');
                body.removeAttribute('data-theme');
                
                // Apply selected theme
                if (theme === 'system') {
                    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                        body.classList.add('light-mode');
                    }
                } else if (theme === 'light') {
                    body.classList.add('light-mode');
                } else if (theme === 'dark') {
                    // Default dark theme
                } else {
                    body.setAttribute('data-theme', theme);
                }
                
                // Save theme preference
                localStorage.setItem('theme', theme);
            });
        });
        
        // Apply saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && themeButtons[savedTheme]) {
            themeButtons[savedTheme].click();
        }
        
        // Experience Tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding content
                const tabId = btn.getAttribute('data-tab');
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
        
        // Form Validation
        const contactForm = document.getElementById('contact-form');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');
        const formMessage = document.getElementById('form-message');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            // Reset errors
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            messageError.style.display = 'none';
            nameInput.classList.remove('error-border');
            emailInput.classList.remove('error-border');
            messageInput.classList.remove('error-border');
            formMessage.className = 'form-message';
            
            // Validate name
            if (!nameInput.value.trim()) {
                nameError.style.display = 'block';
                nameInput.classList.add('error-border');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
                emailError.style.display = 'block';
                emailInput.classList.add('error-border');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
                messageError.style.display = 'block';
                messageInput.classList.add('error-border');
                isValid = false;
            }
            
            if (isValid) {
                // Form is valid - submit to Formspree
                const formData = new FormData(contactForm);
                const xhr = new XMLHttpRequest();
                
                xhr.open('POST', contactForm.action, true);
                xhr.setRequestHeader('Accept', 'application/json');
                
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200) {
                            // Success
                            formMessage.textContent = 'Message sent successfully!';
                            formMessage.classList.add('success');
                            contactForm.reset();
                        } else {
                            // Error
                            formMessage.textContent = 'Oops! There was a problem sending your message.';
                            formMessage.classList.add('error');
                        }
                    }
                };
                
                xhr.send(formData);
            }
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    document.querySelectorAll('.nav-link a').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
        
        // Active nav link based on scroll position
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link a');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 100) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
//Email Settings

const form = document.querySelector("form");
const fullName= document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");


// function sendEmail(){
//     const bodyMessage = `Full Name: ${fullName.value}<br> Email: ${email.value}
//     <br> Phone Number: ${phone.value}<br> Message: ${message.value}`;

//     Email.send({
//         To : 'joeloluwasogo@gmail.com',
//         From : "joeloluwasogo@gmail.com",
//         Subject : subject.value,
//         Body : bodyMessage
//     }).then(
//         message => {
//             if(message == "OK"){
//                 Swal.fire({
//                     title: "Your email has been sent successfully!",
//                     text: "I will get back to you as soon as possible!",
//                     icon: "success"
//                   });
//             }
//         }
//     );
// };

// form.addEventListener("submit",(e) => {
//     e.preventDefault();

//     sendEmail();
// });


// document.getElementById('downloadCv').addEventListener('click', function(event) {
//     event.preventDefault(); 
//     if (confirm('CV Would you like to download the file?')) {
//         window.location.href = 'joeloluwasogo.pdf'; 
//     }
// });
// document.getElementById('downloadCv2').addEventListener('click', function(event) {
//     event.preventDefault(); 
//     if (confirm('CV Would you like to download the file?')) {
//         window.location.href = 'joeloluwasogo.pdf'; 
//     }
// });
