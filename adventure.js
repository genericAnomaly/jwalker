var adventure = {
    'meta'  :   {
        /* Stuff defining the adventure will probably go here */
        'name'      :   'Dennis Quest',
        'author'    :   'Dennis',
        'start'     :   'foyer'
    },
    'rooms'   :   {
        'foyer' :   {
            'img'   :   'foyer.png',
            'map'   :   {
                'stairs'    :   {
                    'area'      :   {'shape' : 'poly', 'coords' : '220,0,390,110,485,105,400,0'},
                    'hover'     :   {'cursor' : 'move'},
                    'click'     :   {'go' : 'upstairs'}
                },
                'door'      :   {
                    'area'      :   {'shape' : 'rect', 'coords' : '577,187,695,434'},
                    'hover'     :   {'cursor' : 'move'},
                    'click'     :   {'go' : 'outside'}
                }
            }
        },
        'upstairs'  :   {
            'img'   :   'upstairs.png',
            'map'   :   {
                'stairs'  :   {
                    'area'      :   {'shape' : 'rect', 'coords' : '510,440,800,600'},
                    'hover'     :   {'cursor' : 'move'},
                    'click'     :   {'go' : 'foyer'}
                }
            }
        },
        'outside'  :   {
            'img'   :   'outside.png',
            'map'   :   {
                'door'  :   {
                    'area'      :   {'shape' : 'rect', 'coords' : '300,170,350,330'},
                    'hover'     :   {'cursor' : 'move'},
                    'click'     :   {'go' : 'foyer'}
                }
            }
        }
    },
    'variables'     : {
        /*Reserved for further development, if the adventure needs to be able to store and check information about its state*/
    }
};





















//Hey Atom, suck my whitespace
