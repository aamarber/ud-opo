var date = new Date(2023, 9, 9);

let selectedDates =  [new Date(2023, 10, 12)];

for(let i = 0; i < 21; i++){
    let d = new Date(date);

    d.setDate(d.getDate() + i);

    selectedDates.push(d);
}

$('#calendar').multiDatesPicker({
    firstDay: 1,
    defaultDate:"10/09/2023",
    addDates: selectedDates,
    numberOfMonths: [1,2],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    monthNames: ['', '', '', '', '', '', '', '', '', 'Octubre', 'Noviembre', '']
});