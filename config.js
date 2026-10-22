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
