import { Component, OnInit } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'app-formrender',
  templateUrl: './formrender.page.html',
  styleUrls: ['./formrender.page.scss'],
})
export class FormrenderPage implements OnInit {
  

  constructor() { }

  ngOnInit(): void {
    const fbRender = document.getElementById("fb-render");

    /* const originalFormData = [
      {
        "type": "header",
        "subtype": "h1",
        "label": "Encuesta sobre democracia y politica",
        "access": false
      },
      {
        "type": "radio-group",
        "required": true,
        "label": "¿Para usted quien es el mejor aspirante es diputaciones para el distrito lll en Merida?",
        "inline": false,
        "name": "radio-group-1614232646715",
        "access": false,
        "other": false,
        "values": [
          {
            "label": "Pablo Gamboa",
            "value": "option-1",
            "selected": false
          },
          {
            "label": "Karem Achach Ramírez",
            "value": "option-2",
            "selected": false
          },
          {
            "label": "Limbert Interian",
            "value": "option-3",
            "selected": false
          }
        ]
      },
      {
        "type": "checkbox-group",
        "required": true,
        "label": "¿Que partes del discurso deben de abarcar los aspirantes?",
        "toggle": false,
        "inline": false,
        "name": "checkbox-group-1614231939743",
        "access": false,
        "other": false,
        "values": [
          {
            "label": "Seguridad",
            "value": "option-1",
            "selected": false
          },
          {
            "label": "Educacion",
            "value": "option-2",
            "selected": false
          },
          {
            "label": "Salud",
            "value": "option-3",
            "selected": false
          },
          {
            "label": "Economia",
            "value": "option-4",
            "selected": false
          }
        ]
      },
      {
        "type": "checkbox-group",
        "required": false,
        "label": "¿Que propuestas le intereso más de todos los candidatos?",
        "toggle": false,
        "inline": false,
        "name": "checkbox-group-1614233530807",
        "access": false,
        "other": false,
        "values": [
          {
            "label": "Colocar alumbrado publica",
            "value": "option-1",
            "selected": false
          },
          {
            "label": "Remodelación de espacios educativos",
            "value": "",
            "selected": false
          },
          {
            "label": "Apoyo para créditos productivos",
            "value": "",
            "selected": false
          }
        ]
      },
      {
        "type": "radio-group",
        "required": false,
        "label": "¿Votara en las elecciones 2021?",
        "inline": false,
        "name": "radio-group-1614233689704",
        "access": false,
        "other": false,
        "values": [
          {
            "label": "Si",
            "value": "option-1",
            "selected": false
          },
          {
            "label": "No",
            "value": "option-2",
            "selected": false
          },
          {
            "label": "Nose",
            "value": "option-3",
            "selected": false
          }
        ]
      },
      {
        "type": "checkbox-group",
        "required": true,
        "label": "¿Cree usted que la pandemia de COVID-19 pueda afectarle para salir a votar?",
        "toggle": false,
        "inline": false,
        "name": "checkbox-group-1614233766714",
        "access": false,
        "other": false,
        "values": [
          {
            "label": "Si",
            "value": "option-1",
            "selected": false
          },
          {
            "label": "No",
            "value": "",
            "selected": false
          },
          {
            "label": "Nose",
            "value": "",
            "selected": false
          }
        ]
      },
      {
        "type": "text",
        "required": false,
        "label": "Comentario",
        "className": "form-control",
        "name": "text-1614233904757",
        "access": false,
        "subtype": "text"
      },
      {
        "type": "button",
        "label": "Guardar",
        "subtype": "button",
        "className": "btn-success btn",
        "name": "button-1614232051444",
        "access": false,
        "style": "success"
      },
      {
        "type": "button",
        "label": "Salir",
        "subtype": "button",
        "className": "btn-danger btn",
        "name": "button-1614232082419",
        "access": false,
        "style": "danger"
      }
    ]; */

    /* const originalFormData = [{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"Encuesta sobre democracia y politica\",\"access\":false},{\"type\":\"radio-group\",\"required\":true,\"label\":\"¿Para usted quién es el mejor aspirante es diputaciones para el distrito lll en Mérida?\",\"inline\":false,\"name\":\"radio-group-1614232646715\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Pablo Gamboa\",\"value\":\"option-1\"},{\"label\":\"Karem Achach Ramírez\",\"value\":\"option-2\"},{\"label\":\"Limbert Interian\",\"value\":\"option-3\"}]},{\"type\":\"checkbox-group\",\"required\":true,\"label\":\"¿Que partes del discurso deben de abarcar los aspirantes?\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1614231939743\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Seguridad\",\"value\":\"option-1\"},{\"label\":\"Educacion\",\"value\":\"option-2\"},{\"label\":\"Salud\",\"value\":\"option-3\"},{\"label\":\"Economia\",\"value\":\"option-4\"}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"¿Qué propuestas le interesó más de todos los candidatos?\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1614233530807\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Colocar alumbrado publica\",\"value\":\"option-1\"},{\"label\":\"Remodelación de espacios educativos\",\"value\":\"\"},{\"label\":\"Apoyo para créditos productivos\",\"value\":\"\"}]},{\"type\":\"radio-group\",\"required\":false,\"label\":\"¿Votará en las elecciones 2021?\",\"inline\":false,\"name\":\"radio-group-1614233689704\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Si\",\"value\":\"option-1\"},{\"label\":\"No\",\"value\":\"option-2\"},{\"label\":\"No sé\",\"value\":\"option-3\"}]},{\"type\":\"text\",\"required\":false,\"label\":\"Comentario\",\"className\":\"form-control\",\"name\":\"text-1614233904757\",\"access\":false,\"subtype\":\"text\"},{\"type\":\"file\",\"required\":false,\"label\":\"Subida de archivo\",\"className\":\"form-control\",\"name\":\"file-1614810773034\",\"access\":false,\"subtype\":\"file\",\"multiple\":false}]" */

    const originalFormData = JSON.parse("[{\"type\":\"header\",\"subtype\":\"h1\",\"label\":\"Encuesta sobre democracia y politica\",\"access\":false},{\"type\":\"radio-group\",\"required\":true,\"label\":\"¿Para usted quién es el mejor aspirante es diputaciones para el distrito lll en Mérida?\",\"inline\":false,\"name\":\"radio-group-1614232646715\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Pablo Gamboa\",\"value\":\"option-1\"},{\"label\":\"Karem Achach Ramírez\",\"value\":\"option-2\"},{\"label\":\"Limbert Interian\",\"value\":\"option-3\"}]},{\"type\":\"checkbox-group\",\"required\":true,\"label\":\"¿Que partes del discurso deben de abarcar los aspirantes?\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1614231939743\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Seguridad\",\"value\":\"option-1\"},{\"label\":\"Educacion\",\"value\":\"option-2\"},{\"label\":\"Salud\",\"value\":\"option-3\"},{\"label\":\"Economia\",\"value\":\"option-4\"}]},{\"type\":\"checkbox-group\",\"required\":false,\"label\":\"¿Qué propuestas le interesó más de todos los candidatos?\",\"toggle\":false,\"inline\":false,\"name\":\"checkbox-group-1614233530807\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Colocar alumbrado publica\",\"value\":\"option-1\"},{\"label\":\"Remodelación de espacios educativos\",\"value\":\"\"},{\"label\":\"Apoyo para créditos productivos\",\"value\":\"\"}]},{\"type\":\"radio-group\",\"required\":false,\"label\":\"¿Votará en las elecciones 2021?\",\"inline\":false,\"name\":\"radio-group-1614233689704\",\"access\":false,\"other\":false,\"values\":[{\"label\":\"Si\",\"value\":\"option-1\"},{\"label\":\"No\",\"value\":\"option-2\"},{\"label\":\"No sé\",\"value\":\"option-3\"}]},{\"type\":\"text\",\"required\":false,\"label\":\"Comentario\",\"className\":\"form-control\",\"name\":\"text-1614233904757\",\"access\":false,\"subtype\":\"text\"},{\"type\":\"file\",\"required\":false,\"label\":\"Subida de archivo\",\"className\":\"form-control\",\"name\":\"file-1614810773034\",\"access\":false,\"subtype\":\"file\",\"multiple\":false}]");

    jQuery(function($:any) {
      const formData = JSON.stringify(originalFormData);
    
      $(fbRender).formRender({ formData });
      
    });

  }

}
