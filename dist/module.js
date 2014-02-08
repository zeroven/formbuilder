define(function(require, exports, module){
    //
    require('jquery');
    var $ = jQuery;
    console.info(123,$);
    require('jquicore');
    require('widget');
    require('mouse');
    require('draggable');
    require('droppable');
    require('sortable');
    require('underscore');
    require('rivets');
    require('backbone');

    require('./formbuilder');
    console.info(234);
    return;
    $(function(){
      fb = new Formbuilder({
        selector: '.fb-main',
        bootstrapData: [
          {
            "label": "Do you have a website?",
            "field_type": "website",
            "required": false,
            "field_options": {},
            "cid": "c1"
          },
          {
            "label": "Please enter your clearance number",
            "field_type": "text",
            "required": true,
            "field_options": {},
            "cid": "c6"
          },
          {
            "label": "Security personnel #82?",
            "field_type": "radio",
            "required": true,
            "field_options": {
                "options": [{
                    "label": "Yes",
                    "checked": false
                }, {
                    "label": "No",
                    "checked": false
                }],
                "include_other_option": true
            },
            "cid": "c10"
          },
          {
            "label": "Medical history",
            "field_type": "file",
            "required": true,
            "field_options": {},
            "cid": "c14"
          }
        ]
      });

      fb.on('save', function(payload){
        //console.log(payload);
      })
    });
})