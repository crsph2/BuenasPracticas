/* =========================================================
   Encuentro de Buenas Prácticas · Formación de Pregrado · UDP
   ========================================================= */

(function () {
  'use strict';

  const FORM_URL = 'https://forms.gle/nt7oTcX3CLDruh5g8';

  const MESES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const JORNADAS = {
    '2026-12-09': {
      fechaCorta: '9 de diciembre de 2026',
      fechaLarga: 'Miércoles 9 de diciembre de 2026',
      etiqueta: 'Jornada 1 · Conferencia',
      titulo: 'Charla: Docencia inclusiva',
      horario: '14:30 – 15:50',
      conferencia: {
        hora: '14:30 – 15:50',
        titulo: 'Docencia inclusiva',
        persona: 'Pablo Rodríguez · UAM (Zoom)'
      },
      mesas: []
    },
    '2026-12-10': {
      fechaCorta: '10 de diciembre de 2026',
      fechaLarga: 'Jueves 10 de diciembre de 2026',
      etiqueta: 'Jornada 2 · Conversatorio',
      titulo: 'Conversatorio: Diseño formativo inclusivo',
      horario: '09:30 – 11:00',
      conferencia: {
        hora: '09:30 – 11:00',
        titulo: 'Diseño formativo inclusivo',
        persona: 'Cristina Petreñas y Clara Sansó · UdL (Zoom)'
      },
      mesas: []
    },
    '2026-12-16': {
      fechaCorta: '16 de diciembre de 2026',
      fechaLarga: 'Miércoles 16 de diciembre de 2026',
      etiqueta: 'Jornada 3 · Mesas',
      titulo: 'Presentación de experiencias y mesas 1 a 6',
      horario: '09:30 – 17:20',
      conferencia: {
        hora: '09:30 – 11:20',
        titulo: 'Inauguración y presentación de experiencias: Docencia en primera persona',
        persona: 'Docentes destacados UDP'
      },
      mesas: [
        { etiqueta: 'Mesa 1', titulo: 'Metodologías activas y Tecnologías emergentes', sala: 'Vértice/CREA', ancla: '#mesa-1', hora: '14:30 – 15:50' },
        { etiqueta: 'Mesa 2', titulo: 'Habilidades profesionales', sala: 'Vértice/CREA', ancla: '#mesa-2', hora: '14:30 – 15:50' },
        { etiqueta: 'Mesa 3', titulo: 'Evaluar para la diversidad', sala: 'Vértice/CREA', ancla: '#mesa-3', hora: '14:30 – 15:50' },
        { etiqueta: 'Mesa 4', titulo: 'Inserción y apoyo académico', sala: 'Vértice/CREA', ancla: '#mesa-4', hora: '16:00 – 17:20' },
        { etiqueta: 'Mesa 5', titulo: 'Evaluación para el aprendizaje', sala: 'Vértice/CREA', ancla: '#mesa-5', hora: '16:00 – 17:20' },
        { etiqueta: 'Mesa 6', titulo: 'Consideraciones inclusivas para la práctica docente', sala: 'Vértice/CREA', ancla: '#mesa-6', hora: '16:00 – 17:20' }
      ]
    },
    '2026-12-17': {
      fechaCorta: '17 de diciembre de 2026',
      fechaLarga: 'Jueves 17 de diciembre de 2026',
      etiqueta: 'Jornada 4 · Mesas',
      titulo: 'Mesas 7 a 12 y presentación del libro',
      horario: '10:00 – 14:30',
      conferencia: {
        hora: '13:10 – 14:30',
        titulo: 'Presentación del libro: Buenas Prácticas en la Formación de Pregrado UDP',
        persona: 'Almuerzo opcional'
      },
      mesas: [
        { etiqueta: 'Mesa 7', titulo: 'Experiencias de interdisciplina', sala: 'Vértice/CREA', ancla: '#mesa-7', hora: '10:00 – 11:20' },
        { etiqueta: 'Mesa 8', titulo: 'Investigación, creación e innovación', sala: 'Vértice/CREA', ancla: '#mesa-8', hora: '10:00 – 11:20' },
        { etiqueta: 'Mesa 9', titulo: 'Formar para la inclusión', sala: 'Vértice/CREA', ancla: '#mesa-9', hora: '10:00 – 11:20' },
        { etiqueta: 'Mesa 10', titulo: 'Gestión curricular y Desarrollo docente', sala: 'Vértice/CREA', ancla: '#mesa-10', hora: '11:30 – 12:50' },
        { etiqueta: 'Mesa 11', titulo: 'Internacionalización y Vinculación con el medio', sala: 'Vértice/CREA', ancla: '#mesa-11', hora: '11:30 – 12:50' },
        { etiqueta: 'Mesa 12', titulo: 'Planes de estudio e inclusión', sala: 'Vértice/CREA', ancla: '#mesa-12', hora: '11:30 – 12:50' }
      ]
    }
  };

  const estado = { anio: 2026, mes: 12, seleccion: null };
  const elTitulo = document.getElementById('calTitulo');
  const elGrid = document.getElementById('calGrid');
  const elPanel = document.getElementById('calDetalle');
  const btnPrev = document.getElementById('mesAnterior');
  const btnNext = document.getElementById('mesSiguiente');

  function clave(anio, mes, dia) {
    return anio + '-' + String(mes).padStart(2, '0') + '-' + String(dia).padStart(2, '0');
  }

  function capitalizar(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  function renderCalendario() {
    const anio = estado.anio;
    const mes = estado.mes;
    elTitulo.textContent = capitalizar(MESES[mes - 1]) + ' ' + anio;

    const primerDia = new Date(anio, mes - 1, 1);
    const offset = (primerDia.getDay() + 6) % 7;
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
        btn.setAttribute('aria-label', dia + ' de ' + MESES[mes - 1] + '. ' + jornada.etiqueta);

        if (estado.seleccion === k) {
          btn.classList.add('cal-dia--activo');
          btn.setAttribute('aria-pressed', 'true');
        } else {
          btn.setAttribute('aria-pressed', 'false');
        }

        btn.addEventListener('click', function () { seleccionarDia(k, btn); });
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

  function renderPanel() {
    const k = estado.seleccion;

    if (!k || !JORNADAS[k]) {
      elPanel.innerHTML =
        '<p class="panel-etiqueta">Detalle del día</p>' +
        '<h3>Selecciona una fecha</h3>' +
        '<p>Los días marcados en azul corresponden a las jornadas del encuentro.</p>';
      return;
    }

    const j = JORNADAS[k];
    let mesasHTML = '';
    
    if (j.mesas.length > 0) {
      mesasHTML = j.mesas.map(function (m) {
        return '<li><a href="' + m.ancla + '" data-vista="mesas">' + m.etiqueta + '. ' + m.titulo + '</a> — ' + m.hora + '</li>';
      }).join('');
      mesasHTML = '<p class="panel-subtitulo">Mesas de trabajo (requieren inscripción)</p><ul class="panel-lista">' + mesasHTML + '</ul>';
    }

    // Solo mostramos botón de inscripción si hay mesas (días 16 y 17)
    const btnInscripcion = j.mesas.length > 0 
      ? '<a class="btn btn-primario" href="' + FORM_URL + '" target="_blank" rel="noopener">Inscríbete en las mesas</a>' 
      : '';

    elPanel.innerHTML =
      '<p class="panel-etiqueta">' + j.etiqueta + '</p>' +
      '<h3>' + j.titulo + '</h3>' +
      '<p><strong>Fecha:</strong> ' + j.fechaLarga + '</p>' +
      '<p><strong>Horario:</strong> ' + j.horario + '</p>' +
      '<div class="panel-destacado">' +
        '<p class="panel-subtitulo">Actividad principal</p>' +
        '<p><strong>' + j.conferencia.titulo + '</strong></p>' +
        '<p>' + j.conferencia.persona + '</p>' +
      '</div>' +
      mesasHTML +
      btnInscripcion;
  }

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

  /* Pestañas */
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
    tab.addEventListener('click', function () { activarTab(tab); });
    tab.addEventListener('keydown', function (evento) {
      let destino = null;
      if (evento.key === 'ArrowRight') destino = tabs[(indice + 1) % tabs.length];
      else if (evento.key === 'ArrowLeft') destino = tabs[(indice - 1 + tabs.length) % tabs.length];
      else if (evento.key === 'Home') destino = tabs[0];
      else if (evento.key === 'End') destino = tabs[tabs.length - 1];

      if (destino) {
        evento.preventDefault();
        destino.focus();
        activarTab(destino);
      }
    });
  });

  /* Navegación */
  const navLinks = document.querySelectorAll('a[data-vista]');
  const vistas = document.querySelectorAll('.vista');

  function mostrarVista(id, scrollToId = null) {
    vistas.forEach(function (v) {
      v.hidden = (v.id !== 'vista-' + id);
    });

    navLinks.forEach(function (link) {
      if (link.dataset.vista === id) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    if (scrollToId) {
      const el = document.getElementById(scrollToId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        el.setAttribute('tabindex', '-1');
        el.focus({ preventScroll: true });
        // Abrir el details si estaba cerrado
        if (el.tagName.toLowerCase() === 'details') el.open = true;
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const targetVista = document.getElementById('vista-' + id);
      if (targetVista) {
        const titulo = targetVista.querySelector('h1, h2');
        if (titulo) {
          titulo.setAttribute('tabindex', '-1');
          titulo.focus({ preventScroll: true });
        }
      }
    }
  }

  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    if (link.dataset.vista) {
      e.preventDefault();
      const id = link.dataset.vista;
      history.pushState({ vista: id }, '', '#' + id);
      mostrarVista(id);
      return;
    }

    const href = link.getAttribute('href');
    if (href && href.startsWith('#mesa-')) {
      e.preventDefault();
      const mesaId = href.substring(1);
      history.pushState({ vista: 'mesas', scrollTo: mesaId }, '', '#mesas');
      mostrarVista('mesas', mesaId);
    }
  });

  window.addEventListener('popstate', function (e) {
    if (e.state && e.state.vista) {
      mostrarVista(e.state.vista, e.state.scrollTo || null);
    } else {
      const hash = window.location.hash.replace('#', '');
      const vistasPosibles = ['inicio', 'calendario', 'programa', 'mesas', 'expositores', 'inscripcion'];
      mostrarVista(vistasPosibles.includes(hash) ? hash : 'inicio');
    }
  });

  /* ICS */
  const btnICS = document.getElementById('btnDescargarICS');
  if (btnICS) {
    btnICS.addEventListener('click', function() {
      const eventos = [
        { inicio: '20261209T143000', fin: '20261209T155000', titulo: 'Charla: Docencia inclusiva (Pablo Rodríguez)', descripcion: 'Actividad vía Zoom.', lugar: 'Vía Zoom' },
        { inicio: '20261210T093000', fin: '20261210T110000', titulo: 'Conversatorio: Diseño formativo inclusivo (UdL)', descripcion: 'Actividad vía Zoom.', lugar: 'Vía Zoom' },
        { inicio: '20261216T093000', fin: '20261216T172000', titulo: 'Inauguración, experiencias y Mesas 1-6', descripcion: 'Encuentro de Buenas Prácticas UDP.', lugar: 'Vértice y Sala CREA' },
        { inicio: '20261217T100000', fin: '20261217T143000', titulo: 'Mesas 7-12 y Presentación del libro', descripcion: 'Encuentro de Buenas Prácticas UDP.', lugar: 'Vértice y Sala CREA' }
      ];

      let icsContent = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//UDP//Encuentro Buenas Practicas//ES', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH'];
      eventos.forEach(function(ev) {
        icsContent.push('BEGIN:VEVENT');
        icsContent.push('UID:' + Date.now() + Math.random().toString(36).substring(2) + '@udp.cl');
        icsContent.push('DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z');
        icsContent.push('DTSTART:' + ev.inicio);
        icsContent.push('DTEND:' + ev.fin);
        icsContent.push('SUMMARY:' + ev.titulo);
        icsContent.push('DESCRIPTION:' + ev.descripcion);
        icsContent.push('LOCATION:' + ev.lugar);
        icsContent.push('END:VEVENT');
      });
      icsContent.push('END:VCALENDAR');

      const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Encuentro_Buenas_Practicas_UDP.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  /* Init */
  function init() {
    const hash = window.location.hash.replace('#', '');
    const vistasPosibles = ['inicio', 'calendario', 'programa', 'mesas', 'expositores', 'inscripcion'];
    const initialVista = vistasPosibles.includes(hash) ? hash : 'inicio';

    document.querySelectorAll('[data-form]').forEach(function (enlace) {
      enlace.href = FORM_URL;
    });

    renderCalendario();
    renderPanel();
    mostrarVista(initialVista);
    history.replaceState({ vista: initialVista }, '', '#' + initialVista);
  }

  init();
})();
