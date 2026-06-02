/**
 * tema.js
 * Gestisce il toggle chiaro / scuro.
 * Salva la preferenza in localStorage così viene ricordata alla prossima visita.
 */

// Inizia una IIFE (Function Expression Immediatamente Invocata): isola il codice per evitare conflitti con altri script
(function () {
    // Seleziona dal DOM l'interruttore (solitamente una checkbox HTML) tramite il suo ID
    const toggle = document.getElementById('theme-toggle');
    // Definisce una costante stringa che farà da etichetta (chiave) per salvare il dato nel browser
    const CHIAVE = 'tema-ventrice';

    // Va a leggere nella memoria del browser (localStorage) se c'è un valore salvato per quella chiave
    const temaSalvato = localStorage.getItem(CHIAVE);

    // Se il valore trovato in memoria corrisponde esattamente alla stringa 'scuro'
    if (temaSalvato === 'scuro') {
        // Attiva immediatamente le impostazioni per la modalità scura
        attivaScuro();
    // Se invece non c'è nulla in memoria (è la primissima volta che l'utente visita il sito)
    } else if (temaSalvato === null) {
        // Verifica se il browser e il sistema operativo dell'utente supportano e hanno attiva la Dark Mode di sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // Se il sistema dell'utente è scuro, adegua il sito attivando la modalità scura
            attivaScuro();
        }
    }

    // Mette un "ascoltatore" sull'interruttore che si attiva ogni volta che lo stato della levetta cambia (click)
    toggle.addEventListener('change', function () {
        // Se l'interruttore è stato attivato (la spunta sulla checkbox è presente)
        if (this.checked) {
            // Esegue la funzione per impostare il tema scuro
            attivaScuro();
        // Se l'interruttore viene disattivato (tolta la spunta)
        } else {
            // Esegue la funzione per ripristinare il tema chiaro
            attivaChiaro();
        }
    });

    // Definizione della funzione che si occupa di impostare il tema scuro
    function attivaScuro() {
        // Aggiunge la classe CSS 'dark-theme' al tag <body> della pagina per attivare le regole di colore scuro
        document.body.classList.add('dark-theme');
        // Forza graficamente l'interruttore a posizionarsi su "acceso" (spuntato)
        toggle.checked = true;
        // Salva nel browser l'informazione che l'utente preferisce il tema 'scuro' per le prossime visite
        localStorage.setItem(CHIAVE, 'scuro');
    }

    // Definizione della funzione che si occupa di impostare il tema chiaro
    function attivaChiaro() {
        // Rimuove la classe CSS 'dark-theme' dal tag <body>, facendo tornare attivi i colori chiari di base
        document.body.classList.remove('dark-theme');
        // Forza graficamente l'interruttore a posizionarsi su "spento" (non spuntato)
        toggle.checked = false;
        // Aggiorna la memoria del browser salvando l'informazione che l'utente ora preferisce il tema 'chiaro'
        localStorage.setItem(CHIAVE, 'chiaro');
    }
// Chiude la funzione anonima e la esegue immediatamente all'avvio del file script
})();