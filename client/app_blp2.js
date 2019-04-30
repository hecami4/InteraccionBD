var urlBase = "/events"

$('#start_date,#end_date').datepicker({dateFormat:"yy-mm-dd"});
$('#start_hour,#end_hour').timepicker({timeFormat:"HH:mm:ss"});

var titulo = $('#titulo').val()
var fecha_ini = $('#start_date').val()
var fecha_fin = $('#end_date').val()
var hora_ini = $('#start_hour').val()
var hora_fin = $('#end_hour').val()


  document.addEventListener('DOMContentLoaded',function(){
/*    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl,{
      plugins: ['dayGrid', 'interaction', 'list']
    })
    calendar.render();*/
    DataInicial();
  })


function guardaEvento2(){
  let dt = {
   "titulo" : $('#titulo').val(),
   "fecha_ini" : $('#start_date').val(),
   "fecha_fin" : $('#end_date').val(),
   "hora_ini" : $('#start_hour').val(),
   "hora_fin" : $('#end_hour').val()
}
  $.post(urlBase+'/new',dt, function(response) {
            console.log(response)
            })
}

function DataInicial() {
    url = urlBase + "/all"
    //response.render(response)
    //console.log("app ln 41 "+response)
    $.get(url, (response) => {
        if (response== "noLOGIN"){
            window.location.href = "index.html";
        }
        console.log(response)
        var calendarEl = document.getElementById('calendar');
        var calendar = new FullCalendar.Calendar(calendarEl,{
        plugins: ['dayGrid', 'interaction', 'list'],
        now:'2019-04-29',
        editable : true,
        aspectratio:1.8,
        scrolltime: '00:00',
        eventOverlap:false,
        slotDuration: '00:30:00',
        header:{left:'title', center:'dayGridMonth,agendaWeek,listWeek',right:'next,prev'},
        defaultView:'dayGridMonth',
        events: [
          /*title = 'test134pm',
          start = FullCalendar.formatDate('2019-04-26', {month:'long',year:'numeric',day:'numeric',locale:'es'}),
          end = FullCalendar.formatDate('2019-04-26',{month:'long',year:'numeric',day:'numeric',locale:'es'})
          */
          title = response.title,
          start = FullCalendar.formatDate(response.start, {month:'long',year:'numeric',day:'numeric',locale:'es'}),
          end = FullCalendar.formatDate(response.end,{month:'long',year:'numeric',day:'numeric',locale:'es'})
        ]
        })
        //console.log(events)
        calendar.rerenderEvents();

      })

}

/*
  function guardaEvento() {
      $('#save').on('click', () => {

          console.log(dt)
          //ev.preventDefault()
          titulo = dt.titulo;
          fecha_ini = dt.fecha_ini;
          fecha_fin = dt.fecha_fin;
          hora_ini = dt.hora_ini;
          hora_fin = dt.hora_fin;
          console.log("fi "+dt.fecha_ini)
          if (!$('#allDay').is(':checked')) {
              titulo = $('#titulo').val();
              fecha_ini = $('#start_date').val();
              fecha_fin = $('#end_date').val()
              hora_ini = $('#start_hour').val()
              hora_fin = $('#end_hour').val()
              hora_ini = fecha_ini + 'T' + hora_ini
              hora_fin = fecha_fin + 'T' + hora_fin
          }
          let url = urlBase+ "/new"
          if (titulo != "" && fecha_ini != "") {
              let ev = {
                  titulo: titulo,
                  fecha_ini: fecha_ini,
                  fecha_fin: fecha_fin
              }
              $.post(url, ev, (response) => {
                  alert("app ln55" +response)


              })
              $('.calendar').FullCalendar.calendar('renderEvent', ev)
              //this.obtenerDataInicial();
          } else {
              alert("Complete los campos obligatorios para el evento")
          }
      })
  }

*/
/*
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.DataInicial()
        this.Formulario()
        this.guardaEvento()
    }

    DataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, (response) => {
            if (response== "noLOGIN"){
                window.location.href = "index.html";
            }
            this.inicializarCalendario(response)
            console.log (response)
        })
    }

     eliminarEvento(evento) {
        let eventId = evento._id
        $.post('/events/delete/', {id: eventId}, (response) => {

           alert(response)
        })
        this.obtenerDataInicial();
    }

    guardaEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let titulo = $('#titulo').val(),
            fecha_ini = $('#start_date').val(),
            fecha_fin = '',
            hora_ini = '',
            hora_fin = '';

            if (!$('#allDay').is(':checked')) {
                fecha_fin = $('#end_date').val()
                hora_ini = $('#start_hour').val()
                hora_fin = $('#end_hour').val()
                fecha_ini = fecha_ini + 'T' + hora_ini
                fecha_fin = fecha_fin + 'T' + hora_fin
            }
            let url = this.urlBase + "/new"
            if (title != "" && start != "") {
                let ev = {
                    title: titulo,
                    start: fecha_ini,
                    end: fecha_fin
                }
                $.post(url, ev, (response) => {
                    alert(response)


                })
                $('.calendar').fullCalendar('renderEvent', ev)
                this.obtenerDataInicial();
            } else {
                alert("Complete los campos obligatorios para el evento")
            }
        })
    }

    Formulario() {
        $('#start_date, #titulo, #end_date').val('');
        $('#start_date, #end_date').datepicker({
            dateFormat: "yy-mm-dd"
        });
        $('.timepicker').timepicker({
            timeFormat: 'HH:mm:ss',
            interval: 30,
            minTime: '5',
            maxTime: '23:59:59',
            defaultTime: '',
            startTime: '5:00',
            dynamic: false,
            dropdown: true,
            scrollbar: true
        });
        $('#allDay').on('change', function(){
            if (this.checked) {
                $('.timepicker, #end_date').attr("disabled", "disabled")
            }else {
                $('.timepicker, #end_date').removeAttr("disabled")
            }
        })
    }
    ///
    actualizarEvento(evento) {

        let id = evento._id,
            start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
            end = moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
            form_data = new FormData(),
            fecha_ini,
            fecha_fin,
            hora_ini,
            hora_fin

        fecha_ini = start.substr(0,10)
        fecha_fin = end.substr(0,10)
        hora_ini = start.substr(11,8)
        hora_fin = end.substr(11,8)



        let ev = {
                    id: id,
                    start: fecha_ini,
                    start_hour:hora_ini,
                    end: fecha_fin,
                    end_hour: hora_fin ,


                }

        $.post('/events/update', ev, function(data) {
            alert(data);
        });



    }
    ///

    }

    }

    const Manager = new EventManager()
    $("#logout").click(function(event) {
        $.get("/events/logout" ,()=>{
            window.location.href= "index.html";
        } );
    });
*/
