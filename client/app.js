//crea un administrador de eventos
class EventManager {
    constructor() {
        this.urlBase = "/events"
        this.obtenerDataInicial()
        this.inicializarFormulario()
        this.guardarEvento()
    }
//descarga la info del usuario cuando se logea e inicializa el componente calendario
    obtenerDataInicial() {
        let url = this.urlBase + "/all"
        $.get(url, (response) => {
            this.inicializarCalendario(response)
        })
    }

//elimina eventos de acuerdo al id
    eliminarEvento(evento) {
        let eventId = evento.id
        $.post('/events/delete/'+eventId, {_id: eventId}, (response) => {
          console.log(response)
            alert(response)
        })
    }
//guarda eventos al dar click en boton de Formulario
    guardarEvento() {
        $('.addButton').on('click', (ev) => {
            ev.preventDefault()
            let nombre = $('#titulo').val(),
            start = $('#start_date').val(),
            title = $('#titulo').val(),
            end = '',
            start_hour = '',
            end_hour = '';

            if (!$('#allDay').is(':checked')) {
                end = $('#end_date').val()
                start_hour = $('#start_hour').val()
                end_hour = $('#end_hour').val()
                start = start + 'T' + start_hour
                end = end + 'T' + end_hour
            }
            let url = this.urlBase + "/new"
            //crea arreglo para enviar a "events" del calendario
             ev = {
                title: title,
                start: start,
                end: end
            }
            //crea arreglo para guardado en BD
            let evlala = {
              titulo:title,
              fecha_ini:start,
              fecha_fin:end
            }
            //valida que haya titulo y fecha de inicio (datos minimos en calendar)
            if (title != "" && start != "") {
                $.post(url, evlala, (response) => {
                    //alert(response)
                })
                $('.calendario').fullCalendar('renderEvent', ev)
                $('#start_date, #titulo, #end_date,#start_hour,#end_hour').val('');
            } else {
                alert("Complete los campos obligatorios para el evento")
            }

        })
    }
//inicializa el formulario y sus campos
    inicializarFormulario() {
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
            dynamic: true,
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
//actualiza los eventos cuando se hace un arrastre en el calendario
    actualizarEvento(evento){
      let id= evento.id,
      start = moment(evento.start).format('YYYY-MM-DD HH:mm:ss'),
      end =moment(evento.end).format('YYYY-MM-DD HH:mm:ss'),
      form_data = new FormData(),
      start_date,
      end_date,
      start_hour,
      end_hour

      start_date=start.substr(0,10)
      end_date=end.substr(0,10)
      start_hour=start.substr(11,8)
      end_hour=end.substr(11,8)
//crea array para envio a rutas y actualizar
      let ev ={
        _id:id,
        start: start_date,
        end:end_date,
        start_hour :start_hour,
        end_hour : end_hour
      }
      $.post('/events/update/'+id,ev,function(data){
        alert(data)
      })
    }
// inicializa el componente de calendario con los datos de inicio
    inicializarCalendario(eventos) {
      //crea array de eventos para que calendar lo pueda parsear
      var eventos_array = [];
      for (var i=0; i<eventos.length;i++){
        var citastest = {
          title:eventos[i]['titulo'],
          start:eventos[i]['fecha_ini'],
          end:eventos[i]['fecha_fin'],
          id:eventos[i]['_id']
        }
        eventos_array.push(citastest)
      }
      //inicializa calendario
          $('.calendario').fullCalendar({
            header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,agendaWeek,basicDay'
            },
            defaultDate: '2019-04-29',
            navLinks: true,
            editable: true,
            eventLimit: true,
            droppable: true,
            dragRevertDuration: 0,
            timeFormat: 'H:mm',
            eventDrop: (event) => {
                this.actualizarEvento(event)

            },
            events: eventos_array,
            eventDragStart: (event,jsEvent) => {
                $('.delete').find('img').attr('src', "img/trash-open.png");
                $('.delete').css('background-color', '#a70f19')
            },
            eventDragStop: (event,jsEvent) => {
                var trashEl = $('.delete');
                var ofs = trashEl.offset();
                var x1 = ofs.left;
                var x2 = ofs.left + trashEl.outerWidth(true);
                var y1 = ofs.top;
                var y2 = ofs.top + trashEl.outerHeight(true);
                if (jsEvent.pageX >= x1 && jsEvent.pageX<= x2 &&
                    jsEvent.pageY >= y1 && jsEvent.pageY <= y2) {
                        this.eliminarEvento(event)
                        $('.calendario').fullCalendar('removeEvents', event.id);
                    }
                }
            })
        }
    }

    const Manager = new EventManager()
