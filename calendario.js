// === DATI DEGLI EVENTI ===
// Definisce un oggetto costante che funge da database locale per gli impegni
const eventi = {
    // Ogni chiave è una data in formato ISO (AAAA-MM-GG) e il valore è un array di oggetti (gli eventi)
    "2026-04-30": [
        { titolo: "Allenamento Calcio", descrizione: "Ultimo allenamento della stagione" }
    ],   
    "2026-05-02": [
        { titolo: "Ultima Verifica di Sistemi e Reti", descrizione: "Argomento - Le Reti" }
    ],
    "2026-05-03": [
        { titolo: "Torneo Mondiale", descrizione: "Sardinia Word Chess Festival - Orosei" }
    ],
    "2026-05-04": [
        { titolo: "Torneo Mondiale", descrizione: "Sardinia Word Chess Festival - Orosei" }
    ],
    "2026-05-05": [
        { titolo: "Torneo Mondiale", descrizione: "Sardinia Word Chess Festival - Orosei" }
    ],
    "2026-05-06": [
        { titolo: "Torneo Mondiale", descrizione: "Sardinia Word Chess Festival - Orosei" }
    ],
    "2026-05-07": [
        { titolo: "Torneo Mondiale", descrizione: "Sardinia Word Chess Festival - Orosei" }
    ],
    "2026-05-08": [
        { titolo: "Torneo Mondiale", descrizione: "Sardinia Word Chess Festival - Orosei" }
    ],
    "2026-05-09": [
        { titolo: "Torneo Mondiale", descrizione: "Sardinia Word Chess Festival - Orosei" }
    ],
    "2026-05-10": [
        { titolo: "Torneo Mondiale", descrizione: "Sardinia Word Chess Festival - Orosei" }
    ],
    "2026-05-30": [
        { titolo: "Campionato Regionale Assoluto", descrizione: "Titolo da difendere - Oristano, 1 turno" }
    ],
    "2026-05-31": [
        { titolo: "Campionato Regionale Assoluto", descrizione: "Titolo da difendere - Oristano, 2-3 turno" }
    ],
    "2026-06-01": [
        { titolo: "Campionato Regionale Assoluto", descrizione: "Titolo da difendere - Oristano, 4-5 turno" }
    ],
    "2026-06-02": [
        { titolo: "Campionato Regionale Assoluto", descrizione: "Titolo da difendere - Oristano, 6-7 turno" }
    ],
    "2026-06-08": [
        { titolo: "Ultimo giorno di scuola", descrizione: "Terza superiore - ITIS Othoca" }
    ],
    "2026-06-14": [
        { titolo: "Compleanno", descrizione: "Ventri fa 17 anni!" }
    ],
};

// Array costante contenente i nomi dei mesi in italiano per la visualizzazione testuale
const nomiMesi = [
    "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
    "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

// Inizializza un oggetto Date con la data e l'ora correnti del sistema
let dataCorrente = new Date();
// Estrae il mese corrente (da 0 per Gennaio a 11 per Dicembre) e lo salva nella variabile modificabile
let meseCorrente = dataCorrente.getMonth();
// Estrae l'anno corrente a 4 cifre (es. 2026) e lo salva nella variabile modificabile
let annoCorrente = dataCorrente.getFullYear();
// Variabile di stato per memorizzare quale giorno è stato cliccato dall'utente (inizialmente nessuno)
let giornoSelezionato = null;

// Definizione della funzione principale che disegna visivamente il calendario per un determinato mese e anno
function generaCalendario(mese, anno) {
    // Seleziona dal DOM l'elemento contenitore che ospiterà i quadratini dei giorni
    const griglia = document.getElementById('griglia-giorni');
    // Seleziona dal DOM l'elemento di testo preposto a mostrare il nome del mese e l'anno corrente
    const titoloMese = document.getElementById('nome-mese');
    
    // Svuota completamente la griglia da eventuali giorni del mese visualizzato in precedenza
    griglia.innerHTML = '';
    // Aggiorna il testo del titolo combinando il nome del mese recuperato dall'array e l'anno numerico
    titoloMese.textContent = `${nomiMesi[mese]} ${anno}`;

    // Calcola il giorno della settimana in cui cade il giorno 1 del mese (0 = Domenica, 1 = Lunedì, ecc.)
    const primoGiorno = new Date(anno, mese, 1).getDay();

    // Converte la scala americana (0=Dom) in europea: se è domenica (0) l'offset è 6, altrimenti è il giorno - 1
    const offset = primoGiorno === 0 ? 6 : primoGiorno - 1;
    
    // Calcola il numero totale di giorni del mese corrente chiedendo il giorno "0" del mese successivo
    const giorniNelMese = new Date(anno, mese + 1, 0).getDate();
    
    // Ciclo for per generare gli spazi vuoti iniziali necessari ad allineare il giorno 1 al giorno della settimana corretto
    for (let i = 0; i < offset; i++) {
        // Crea un nuovo elemento div vuoto nel documento HTML
        const vuoto = document.createElement('div');
        // Assegna le classi CSS 'giorno' e 'vuoto' per formattarlo correttamente senza bordi o numeri
        vuoto.className = 'giorno vuoto';
        // Inserisce il quadratino vuoto appena creato all'interno della griglia
        griglia.appendChild(vuoto);
    }
    
    // Crea un nuovo oggetto Date per ottenere il giorno esatto di "oggi" per il confronto visivo
    const oggi = new Date();
    // Ciclo for principale che genera un quadratino numerato per ogni giorno effettivo del mese
    for (let giorno = 1; giorno <= giorniNelMese; giorno++) {
        // Crea un elemento div che rappresenterà la cella del giorno sul calendario
        const cella = document.createElement('div');
        // Assegna la classe CSS 'giorno' per dare lo stile base al quadratino
        cella.className = 'giorno';
        // Inserisce il numero del giorno corrente all'interno della cella appena creata
        cella.textContent = giorno;
        
        // Genera la stringa chiave (formato YYYY-MM-DD), formattando mese e giorno a due cifre con padStart
        const dataKey = `${anno}-${String(mese + 1).padStart(2, '0')}-${String(giorno).padStart(2, '0')}`;
        
        // Controlla se il giorno, il mese e l'anno che si stanno ciclando corrispondono alla data odierna reale
        if (giorno === oggi.getDate() && mese === oggi.getMonth() && anno === oggi.getFullYear()) {
            // Se corrisponde, aggiunge la classe CSS 'oggi' per evidenziare il giorno corrente (es. con un bordo o sfondo diverso)
            cella.classList.add('oggi');
        }
        
        // Verifica se all'interno dell'oggetto 'eventi' esiste una chiave corrispondente alla data corrente del ciclo
        if (eventi[dataKey]) {
            // Se esiste, aggiunge la classe CSS 'evento' per colorare o mettere un pallino sul quadratino del calendario
            cella.classList.add('evento');
            // Aggiunge un attributo nativo HTML 'title' che mostra un tooltip al passaggio del mouse
            cella.title = "Clicca per vedere gli eventi";
        }
        
        // Aggiunge un ascoltatore di eventi per intercettare il click del mouse sulla cella del giorno
        cella.addEventListener('click', () => {
            // Se il giorno cliccato contiene effettivamente uno o più eventi in memoria
            if (eventi[dataKey]) {
                // Invoca la funzione per stampare a schermo i dettagli degli eventi di questa data
                mostraEventi(dataKey, giorno, mese, anno);
                // Cerca ed elimina la classe 'selezionato' da qualsiasi altro giorno precedentemente cliccato
                document.querySelectorAll('.giorno.selezionato').forEach(g => g.classList.remove('selezionato'));
                // Aggiunge la classe CSS 'selezionato' alla cella corrente per darle un risalto visivo immediato
                cella.classList.add('selezionato');
            }
        });
        
        // Inserisce la cella del giorno finita e configurata all'interno della griglia visibile sul sito
        griglia.appendChild(cella);
    }
}

// Definizione della funzione preposta a mostrare i dettagli degli impegni in un pannello dedicato
function mostraEventi(dataKey, giorno, mese, anno) {
    // Seleziona l'elemento HTML dell'interfaccia adibito a contenere i testi degli impegni
    const pannello = document.getElementById('testo-evento');
    // Recupera l'array di eventi associato alla chiave della data cliccata
    const listaEventi = eventi[dataKey];
    
    // Inizializza una stringa HTML inserendo il titolo superiore con la data estesa formattata
    let html = `<strong style="color:#2e7d32; display:block; margin-bottom:10px;">
        ${giorno} ${nomiMesi[mese]} ${anno}
    </strong>`;
    
    // Cicla ogni singolo impegno presente all'interno dell'array di quella specifica giornata
    listaEventi.forEach(evento => {
        // Appende (somma) alla stringa HTML la struttura visiva per il titolo e la descrizione di ogni impegno
        html += `
            <div class="evento-item">
                <strong>${evento.titolo}</strong>
                <span>${evento.descrizione}</span>
            </div>
        `;
    });
    
    // Sostituisce il contenuto del pannello inserendo tutto il blocco HTML generato con i dettagli degli impegni
    pannello.innerHTML = html;
}

// Aggiunge un ascoltatore di click sul pulsante per andare al mese precedente
document.getElementById('prev-mese').addEventListener('click', () => {
    // Decrementa di un'unità il valore del mese corrente
    meseCorrente--;
    // Controlla se scalando il mese siamo andati sotto Gennaio (che vale 0)
    if (meseCorrente < 0) {
        // Riposiziona il mese a Dicembre (valore 11)
        meseCorrente = 11;
        // Decrementa l'anno corrente di un'unità passando all'anno precedente
    }
    // Ridisegna da capo il calendario aggiornato con i nuovi valori di mese e anno
    generaCalendario(meseCorrente, annoCorrente);
});

// Aggiunge un ascoltatore di click sul pulsante per andare al mese successivo
document.getElementById('next-mese').addEventListener('click', () => {
    // Incrementa di un'unità il valore del mese corrente
    meseCorrente++;
    // Controlla se aumentando il mese abbiamo superato Dicembre (che vale 11)
    if (meseCorrente > 11) {
        // Resetta il contatore del mese portandolo a Gennaio (valore 0)
        meseCorrente = 0;
        // Incrementa l'anno corrente di un'unità portandolo all'anno successivo
        annoCorrente++;
    }
    // Ridisegna da capo il calendario aggiornato con i nuovi valori di mese e anno
    generaCalendario(meseCorrente, annoCorrente);
});

// Esegue la prima chiamata automatica all'avvio dello script per disegnare il calendario del mese corrente
generaCalendario(meseCorrente, annoCorrente);