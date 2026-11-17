/* =========================================================
   Jornada de Buenas Prácticas · Inclusión Educativa · UDP
   Navegación por vistas, calendario interactivo y pestañas
   ========================================================= */

(function () {
  'use strict';

  /* ---------------------------------------------------------
     >> ÚNICO LUGAR QUE DEBES EDITAR PARA EL FORMULARIO <<
     --------------------------------------------------------- */
  const FORM_URL = 'https://forms.gle/2w7oSmajrmrYeEZZ7';

  /* ---------- Datos de las jornadas ---------- */
  const MESES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const JORNADAS = {
    '2026-12-08': {
      fechaCorta: '8 de diciembre de 2026',
      fechaLarga: 'Martes 8 de diciembre de 2026',
      etiqueta: 'Jornada 1 · Tarde',
      titulo: 'Enseñar y evaluar para la diversidad',
      horario: '14:00 – 18:00',
      conferencia: {
        hora: '14:30 – 15:00',
        titulo: 'Docencia universitaria inclusiva',
        persona: 'Pablo Rodríguez · UAM (online)'
      },
      mesas: [
        {
          etiqueta: 'Mesa 1',
          titulo: 'Enseñar y evaluar para la diversidad',
          sala: 'Vértice cerrado',
          ancla: '#mesa-1'
        },
        {
          etiqueta: 'Mesa 2',
          titulo: 'Formar para la inclusión',
          sala: 'CREA',
          ancla: '#mesa-2'
        }
      ]
    },
    '2026-12-09': {
      fechaCorta: '9 de diciembre de 2026',
      fechaLarga: 'Miércoles 9 de diciembre de 2026',
      etiqueta: 'Jornada 2 · Mañana',
      titulo: 'Repensar los planes de estudio y diseñar asignaturas inclusivas',
      horario: '09:00 – 13:00',
      conferencia: {
        hora: '09:20 – 10:00',
        titulo: 'Orientaciones para la incorporación del enfoque inclusivo en planes de estudio, programas de asignaturas y actividades pedagógicas',
        persona: 'Cristina Petreñas y Clara Sansó · UdL (online)'
      },
      mesas: [
        {
          etiqueta: 'Mesa 3',
          titulo: 'Repensar los planes de estudio',
          sala: 'Vértice cerrado',
          ancla: '#mesa-3'
        },
        {
          etiqueta: 'Mesa 4',
          titulo: 'Diseñar asignaturas inclusivas',
          sala: 'CREA',
          ancla: '#mesa-4'
        }
      ]
    }
  };

  /* ---------- Estado del calendario ---------- */
  const estado = { anio: 2026, mes: 12, seleccion: null };

  const elTitulo = document.getElementById('calTitulo');
  const elGrid = document.getElementById('calGrid');
  const elPanel = document.getElementById('calDetalle');
  const btnPrev = document.getElementById('mesAnterior');
  const btnNext = document.getElementById('mesSiguiente');

  /* ---------- Utilidades ---------- */
  function clave(anio, mes, dia) {
    return anio + '-' + String(mes).padStart(2, '0') + '-' + String(dia).padStart(2, '0');
  }

  function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  /* ---------- Calendario ---------- */
  function renderCalendario() {
    const anio = estado.anio;
    const mes = estado.mes;

    elTitulo.textContent = capitalizar(MESES[mes - 1]) + ' ' + anio;

    const primerDia = new Date(anio, mes - 1, 1);
    const offset = (primerDia.getDay() + 6) % 7; // lunes = 0
    const totalDias = new Date(anio, mes, 0).getDate();

    elGrid.innerHTML = '';
    const frag = document.createDocumentFragment();

    for (let i = 0; i < offset; i++) {
      const vacio = document.createElement('span');
      vacio.className = 'cal-dia cal-dia--vacio';
      frag.appendChild(vacio);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      const k = clave(anio, mes, dia);
      const jornada = JORNADAS[k];

      if (jornada) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'cal-dia cal-dia--evento';
        btn.textContent = String(dia);
        btn.setAttribute(
          'aria-label',
          dia + ' de ' + MESES[mes - 1] + ' de ' + anio + '. ' +
          jornada.etiqueta + ': ' + jornada.titulo +
          '. Seleccionar para ver el detalle.'
        );

        const activo = estado.seleccion === k;
        btn.setAttribute('aria-pressed', activo ? 'true' : 'false');
        if (activo) btn.classList.add('cal-dia--activo');

        btn.addEventListener('click', function () {
          seleccionarDia(k, btn);
        });

        frag.appendChild(btn);
      } else {
        const span = document.createElement('span');
        span.className = 'cal-dia';
        span.textContent = String(dia);
        frag.appendChild(span);
      }
    }

    elGrid.appendChild(frag);
  }

  function seleccionarDia(k, btn) {
    estado.seleccion = k;

    elGrid.querySelectorAll('.cal-dia--evento').forEach(function (b) {
      b.classList.remove('cal-dia--activo');
      b.setAttribute('aria-pressed', 'false');
    });

    btn.classList.add('cal-dia--activo');
    btn.setAttribute('aria-pressed', 'true');

    renderPanel();
  }

  /* ---------- Panel de detalle ---------- */
  function renderPanel() {
    const k = estado.seleccion;

    if (!k || !JORNADAS[k]) {
      elPanel.innerHTML =
        '<p class="panel-etiqueta">Detalle del día</p>' +
        '<h3>Selecciona una fecha destacada</h3>' +
        '<p>Los días marcados en azul corresponden a las dos jornadas. ' +
        'Al seleccionarlos verás la conferencia principal, las mesas de trabajo ' +
        'y los espacios asignados.</p>';
      return;
    }

    const j = JORNADAS[k];

    const mesasHTML = j.mesas.map(function (m) {
      return '<li><a href="' + m.ancla + '">' + m.etiqueta + '. ' + m.titulo +
             '</a> — ' + m.sala + '</li>';
    }).join('');

    elPanel.innerHTML =
      '<p class="panel-etiqueta">' + j.etiqueta + '</p>' +
      '<h3>' + j.titulo + '</h3>' +
      '<p><strong>Fecha:</strong> ' + j.fechaLarga + '</p>' +
      '<p><strong>Horario:</strong> ' + j.horario + '</p>' +

      '<div class="panel-destacado">' +
        '<p class="panel-subtitulo">Conferencia · ' + j.conferencia.hora + '</p>' +
        '<p><strong>' + j.conferencia.titulo + '</strong></p>' +
        '<p>' + j.conferencia.persona + '</p>' +
      '</div>' +

      '<p class="panel-subtitulo">Mesas de trabajo</p>' +
      '<ul class="panel-lista">' + mesasHTML + '</ul>' +

      '<a class="btn btn-primario" href="' + FORM_URL + '" target="_blank" rel="noopener">Inscríbete aquí</a>';
  }

  /* ---------- Navegación de meses ---------- */
  if (btnPrev) {
    btnPrev.addEventListener('click', function () {
      estado.mes--;
      if (estado.mes < 1) { estado.mes = 12; estado.anio--; }
      renderCalendario();
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', function () {
      estado.mes++;
      if (estado.mes > 12) { estado.mes = 1; estado.anio++; }
      renderCalendario();
    });
  }

  /* ---------- Pestañas del programa ---------- */
  const tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  function activarTab(tab) {
    tabs.forEach(function (t) {
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      const activo = (t === tab);
      t.setAttribute('aria-selected', activo ? 'true' : 'false');
      t.tabIndex = activo ? 0 : -1;
      if (panel) panel.hidden = !activo;
    });
  }

  tabs.forEach(function (tab, indice) {
    tab.addEventListener('click', function () {
      activarTab(tab);
    });

    tab.addEventListener('keydown', function (evento) {
      let destino = null;

      if (evento.key === 'ArrowRight') {
        destino = tabs[(indice + 1) % tabs.length];
      } else if (evento.key === 'ArrowLeft') {
        destino = tabs[(indice - 1 + tabs.length) % tabs.length];
      } else if (evento.key === 'Home') {
        destino = tabs[0];
      } else if (evento.key === 'End') {
        destino = tabs[tabs.length - 1];
      }

      if (destino) {
        evento.preventDefault();
        destino.focus();
        activarTab(destino);
      }
    });
  });

  /* ---------- Navegación entre vistas ---------- */
  const navLinks = document.querySelectorAll('a[data-vista]');
  const vistas = document.querySelectorAll('.vista');

  function mostrarVista(id, scrollToId = null) {
    // Mostrar/ocultar
    vistas.forEach(function (v) {
      if (v.id === 'vista-' + id) {
        v.hidden = false;
      } else {
        v.hidden = true;
      }
    });

    // Actualizar aria-current
    navLinks.forEach(function (link) {
      if (link.dataset.vista === id) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    // Foco y scroll
    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
      }
    } else {
      const targetVista = document.getElementById('vista-' + id);
      if (targetVista) {
        const titulo = targetVista.querySelector('h1, h2');
        if (titulo) {
          titulo.setAttribute('tabindex', '-1');
          titulo.focus({ preventScroll: true });
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Clics en enlaces
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    // Cambio de vista principal
    if (link.dataset.vista) {
      e.preventDefault();
      const id = link.dataset.vista;
      history.pushState({ vista: id }, '', '#' + id);
      mostrarVista(id);
      return;
    }

    // Enlaces a mesas específicas
    const href = link.getAttribute('href');
    if (href && href.startsWith('#mesa-')) {
      e.preventDefault();
      const mesaId = href.substring(1);
      history.pushState({ vista: 'mesas', scrollTo: mesaId }, '', '#mesas');
      mostrarVista('mesas', mesaId);
    }
  });

  // Navegación hacia atrás/adelante
  window.addEventListener('popstate', function (e) {
    const state = e.state;
    if (state && state.vista) {
      mostrarVista(state.vista, state.scrollTo || null);
    } else {
      const hash = window.location.hash.replace('#', '');
      const vistasPosibles = ['inicio', 'calendario', 'programa', 'mesas', 'expositores', 'inscripcion'];
      const defaultVista = vistasPosibles.includes(hash) ? hash : 'inicio';
      mostrarVista(defaultVista);
    }
  });

  /* ---------- Inicialización ---------- */
  function init() {
    const hash = window.location.hash.replace('#', '');
    const vistasPosibles = ['inicio', 'calendario', 'programa', 'mesas', 'expositores', 'inscripcion'];
    const initialVista = vistasPosibles.includes(hash) ? hash : 'inicio';

    // Configurar enlaces del formulario
    document.querySelectorAll('[data-form]').forEach(function (enlace) {
      enlace.href = FORM_URL;
    });

    // Actualizar fechas dinámicas
    const MAPA_FECHAS = { j1: '2026-12-08', j2: '2026-12-09' };

    document.querySelectorAll('[data-fecha]').forEach(function (el) {
      const k = MAPA_FECHAS[el.getAttribute('data-fecha')];
      if (k && JORNADAS[k]) el.textContent = JORNADAS[k].fechaCorta;
    });

    document.querySelectorAll('[data-fecha-larga]').forEach(function (el) {
      const k = MAPA_FECHAS[el.getAttribute('data-fecha-larga')];
      if (k && JORNADAS[k]) el.textContent = JORNADAS[k].fechaLarga;
    });

    renderCalendario();
    renderPanel();
    mostrarVista(initialVista);
    history.replaceState({ vista: initialVista }, '', '#' + initialVista);
  }

  init();

})();
