import { LISTA_CARICHI } from "./costanti.js";
export function initLightbox(myScheduler) {
  myScheduler.config.lightbox.sections = [
    {
      map_to: "text",
      name: "text",
      type: "textarea",
      height: 24
    },
    // {
    //   map_to: "room",
    //   name: "room",
    //   type: "select",
    //   options: myScheduler.serverList("visibleRooms"),
    // },
    {
      map_to: "idCarico",
      name: "carico",
      type: "radio",
      options: LISTA_CARICHI
    },
    // {
    //   map_to: "is_paid",
    //   name: "is_paid",
    //   type: "checkbox",
    //   checked_value: true,
    //   unchecked_value: false,
    // },
    {
      map_to: "time",
      name: "time",
      type: "calendar_time"
    }
  ];

  //labels
  myScheduler.locale.labels.section_text = "Titolo";
  myScheduler.locale.labels.section_carico = "Carico";
  myScheduler.locale.labels.section_time = "Time";

  //Disabilito i campi nel lightbox
  myScheduler.attachEvent("onLightbox", function(task_id) {
    document.getElementsByTagName("textarea")[0].disabled = true;
  });

  // myScheduler.attachEvent('onBeforeLightbox', function(id) {
  //   //any custom logic here
  //   // let ev = myScheduler.getEvent(id);
  //   // ev.id_carico = ricavaIdCarico(ev.carico);
  //   // return true;
  // });
}
