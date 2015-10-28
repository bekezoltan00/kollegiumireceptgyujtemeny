//console.log('debug');

var table = '<table class="table table-striped table-hover">' +
        '<thead>' +
            '<tr>' +
                '<th>Beküldés ideje</th>' +
                '<th>Recept neve</th>' +
                '<th>Recept nehézsége</th>' +
                '<th>Recept leirása</th>' +
                '<th>Műveletek</th>' +
            '</tr>'    +
        '</thead>' +
        '<tbody>' +
            
        '</tbody>' +
    '</table>';

$('table').each(function () {
    var successTable = $(table);
    var warningTable = $(table);
    
    $(this).find('tr.text-success').each(function () {
        successTable.find('tbody').append($(this));
    });
    $(this).find('tr.text-warning').each(function () {
        warningTable.find('tbody').append($(this));
    });
    warningTable.appendTo('div.container');
    successTable.appendTo('div.container');
    $(this).hide();
});