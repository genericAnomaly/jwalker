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
                    'area'      :   {'shape' : 'poly', 'coords' : '220,0,390,110,485,105,400,0', 'class' : 'arrow-u'},
                    'hover'     :   {'cursor' : 'move'},
                    'click'     :   {'go' : 'upstairs'}
                },
                'door'      :   {
                    'area'      :   {'shape' : 'rect', 'coords' : '577,187,695,434', 'class' : 'arrow-n'},
                    'hover'     :   {'cursor' : 'move'},
                    'click'     :   {'go' : 'outside'}
                }
            }
        },
        'upstairs'  :   {
            'img'   :   'upstairs.png',
            'map'   :   {
                'stairs'  :   {
                    'area'      :   {'shape' : 'rect', 'coords' : '510,440,800,600', 'class' : 'arrow-d'},
                    'hover'     :   {'cursor' : 'move'},
                    'click'     :   {'go' : 'foyer'}
                },
                'trapdoor'  :   {
                    'area'      :   {'shape' : 'poly', 'coords' : '170,23,391,17,395,106,246,107', 'class' : 'arrow-u'},
                    'hover'     :   {'cursor' : 'move'},
                    'click'     :   {'go' : 'attic'}
                }
            }
        },
        'attic'  :   {
            'img'   :   'attic.png',
            'map'   :   {
                'back'  :   {
                    'area'      :   {'shape' : 'rect', 'coords' : '0, 550, 800, 600', 'class' : 'arrow-s'},
                    'hover'     :   {'cursor' : 'move'},
                    'click'     :   {'go' : 'upstairs'}
                }
            }
        },
        'outside'  :   {
            'img'   :   'outside.png',
            'map'   :   {
                'door'  :   {
                    'area'      :   {'shape' : 'rect', 'coords' : '300,170,350,330', 'class' : 'arrow-n'},
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
