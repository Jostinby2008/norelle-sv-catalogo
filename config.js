// Norelle Ropa - Configuración de la tienda
// IMPORTANTE: Configura aquí el número de WhatsApp de la tienda.
// Formato: código de país + número, sin símbolos ni espacios.
// Ejemplo para El Salvador (+503): '50377777777'
//
// Si el número está vacío (''), los botones de WhatsApp mostrarán
// una advertencia al usuario en lugar de abrir un chat inválido.

window.NORELLE_CONFIG = {
  // Número de WhatsApp de la tienda (configúralo aquí)
  whatsappNumber: '',

  // Nombre de la tienda
  storeName: 'Norelle Ropa',

  // Correo de contacto
  email: 'norelle.sv@gmail.com',

  // Instagram
  instagram: 'https://www.instagram.com/norelle.sv',

  // Moneda
  currency: 'USD',
  currencySymbol: '$'
};

// Helper global para construir enlaces de WhatsApp de forma segura.
window.buildWhatsAppUrl = function (message) {
  const number = (window.NORELLE_CONFIG.whatsappNumber || '').replace(/[^\d]/g, '');
  const text = encodeURIComponent(message || '');
  if (!number) {
    return null;
  }
  return `https://wa.me/${number}?text=${text}`;
};

// Abre WhatsApp o avisa si no está configurado.
window.openWhatsApp = function (message) {
  const url = window.buildWhatsAppUrl(message);
  if (!url) {
    alert(
      'El número de WhatsApp de la tienda aún no está configurado.\n\n' +
      'Puedes contactarnos por correo a ' + window.NORELLE_CONFIG.email + ' o por Instagram.'
    );
    return false;
  }
  window.open(url, '_blank');
  return true;
};

// Construye un enlace a Gmail con destinatario, asunto y cuerpo ya redactados.
window.buildGmailUrl = function (to, subject, body) {
  const params = new URLSearchParams();
  params.set('view', 'cm');
  params.set('fs', '1');
  params.set('to', to || window.NORELLE_CONFIG.email);
  if (subject) { params.set('su', subject); }
  if (body) { params.set('body', body); }
  return 'https://mail.google.com/mail/?' + params.toString();
};

// Abre Gmail en una pestaña nueva con el mensaje listo para redactar.
window.openGmail = function (subject, body) {
  const url = window.buildGmailUrl(window.NORELLE_CONFIG.email, subject, body);
  window.open(url, '_blank', 'noopener noreferrer');
  return true;
};

// Convierte todos los enlaces mailto: en enlaces de Gmail (con el mensaje listo).
// Se conservan el asunto y el cuerpo que ya tuviera el mailto original.
document.addEventListener('DOMContentLoaded', function () {
  const emailSubject = 'Consulta desde la tienda Norelle Ropa';
  const emailBody = 'Hola Norelle,\n\nMe gustaría hacer una consulta sobre sus productos.\n\n';
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (el) {
    let to = window.NORELLE_CONFIG.email;
    let subject = emailSubject;
    let body = emailBody;
    try {
      const raw = el.getAttribute('href').slice('mailto:'.length);
      const qIndex = raw.indexOf('?');
      const addr = qIndex === -1 ? raw : raw.slice(0, qIndex);
      if (addr) { to = addr; }
      if (qIndex !== -1) {
        const q = new URLSearchParams(raw.slice(qIndex + 1));
        if (q.get('subject')) { subject = q.get('subject'); }
        if (q.get('body')) { body = q.get('body'); }
      }
    } catch (e) { /* usa los valores por defecto */ }
    el.setAttribute('href', window.buildGmailUrl(to, subject, body));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });
});

// Actualiza los enlaces de WhatsApp dinámicamente si hay número.
document.addEventListener('DOMContentLoaded', function () {
  const defaultMsg = 'Hola! Me gustaría hacer una consulta sobre sus productos';
  const url = window.buildWhatsAppUrl(defaultMsg);
  document.querySelectorAll('a.floating-whatsapp, a[data-whatsapp="1"]').forEach(function (el) {
    if (url) {
      el.href = url;
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    } else {
      el.setAttribute('href', '#');
      el.addEventListener('click', function (e) {
        e.preventDefault();
        window.openWhatsApp(defaultMsg);
      });
    }
  });
});
