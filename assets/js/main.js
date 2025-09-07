/* =========================================================
   JS principal
   Funciones: menú hamburguesa, animación de barras,
   validación en tiempo real del formulario, modal de proyectos
   y pequeñas utilidades.
   ========================================================= */

// Util: seleccionar
const $ = (q, c = document) => c.querySelector(q);
const $$ = (q, c = document) => [...c.querySelectorAll(q)];

// ------------------------------
// Menú hamburguesa accesible
// ------------------------------
const navToggle = $("#navToggle");
const menu = $("#primaryMenu");
if (navToggle && menu){
  navToggle.addEventListener("click", () => {
    const open = menu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Cerrar cuando se elige un enlace (mejor UX en móvil)
  $$("#primaryMenu a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }));
}

// ------------------------------
// Animación de barras de progreso
// usando IntersectionObserver
// ------------------------------
const progressBars = $$(".progress__bar");
if ("IntersectionObserver" in window && progressBars.length){
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const bar = entry.target;
        const target = getComputedStyle(bar).getPropertyValue("--target").trim();
        // Animar ancho y actualizar aria-valuenow
        bar.style.width = target;
        const progress = bar.closest(".progress");
        if (progress){
          const value = parseInt(target, 10);
          progress.setAttribute("aria-valuenow", value);
        }
        obs.unobserve(bar);
      }
    });
  }, { threshold: .5 });
  progressBars.forEach(b => io.observe(b));
}

// ------------------------------
// Modal de proyectos
// ------------------------------
const modal = $("#projectModal");
const modalBody = $("#modalBody");
const modalClose = $("#modalClose");

const projectData = {
  1: {
    title: "Sitio Web Corporativo",
    body: "Proyecto enfocado en una empresa local con páginas responsive, navegación accesible y SEO básico."
  },
  2: {
    title: "Aplicación Web Interactiva",
    body: "Incluye manejo de estado en el cliente y persistencia con localStorage. Interacciones fluidas y accesibles."
  },
  3: {
    title: "Landing Page Creativa",
    body: "Microinteracciones, animaciones al desplazar y copy orientado a conversión. Performance optimizada."
  }
};

$$(".card__link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.currentTarget.getAttribute("data-card");
    if (!id) return;
    const data = projectData[id];
    $("#modalTitle").textContent = data.title;
    modalBody.textContent = data.body;
    if (typeof modal.showModal === "function"){
      modal.showModal();
    } else {
      modal.setAttribute("open","");
    }
  });
});

modalClose?.addEventListener("click", () => modal.close());
modal?.addEventListener("click", (e) => {
  const rect = $(".modal__content").getBoundingClientRect();
  const inDialog = rect.top <= e.clientY && e.clientY <= rect.bottom && rect.left <= e.clientX && e.clientX <= rect.right;
  if (!inDialog) modal.close();
});

// ------------------------------
// Validación del formulario en tiempo real
// ------------------------------
const form = $("#contactForm");
const formSuccess = $("#formSuccess");

function showError(input, message){
  const small = input.parentElement.querySelector(".error");
  if (small){
    small.textContent = message || "";
  }
  input.setAttribute("aria-invalid", message ? "true" : "false");
}

function validateName(){
  const input = $("#name");
  if (input.value.trim().length < 2){
    showError(input, "Escribe al menos 2 caracteres.");
    return false;
  }
  showError(input, "");
  return true;
}

function validateEmail(){
  const input = $("#email");
  const value = input.value.trim();
  const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  if (!ok){ showError(input, "Ingresa un email válido."); return false; }
  showError(input, "");
  return true;
}

function validateMessage(){
  const input = $("#message");
  if (input.value.trim().length < 10){
    showError(input, "Tu mensaje debe tener al menos 10 caracteres.");
    return false;
  }
  showError(input, "");
  return true;
}

$("#name")?.addEventListener("input", validateName);
$("#email")?.addEventListener("input", validateEmail);
$("#message")?.addEventListener("input", validateMessage);

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const ok = [validateName(), validateEmail(), validateMessage()].every(Boolean);
  if (ok){
    form.reset();
    formSuccess.hidden = false;
    setTimeout(() => formSuccess.hidden = true, 3500);
  }
});

// ------------------------------
// Año dinámico en el footer
// ------------------------------
$("#year").textContent = String(new Date().getFullYear());
