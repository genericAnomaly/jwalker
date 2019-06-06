var adventure = {
    'meta'  :   {
        /* Stuff defining the adventure will probably go here */
        'name'      :   'Dennis Quest',
        'author'    :   'Dennis',
        'start'     :   'outside',
        'screen'    :   {'width' : 800, 'height' : 600},
        'path'      :   'assets/' /*Not in use yet*/
    },
    'rooms'   :   {
        'foyer' :   {
            'img'   :   'foyer.png',
            'map'   :   {
                'stairs'    :   {
                    'area'      :   {'shape' : 'poly', 'coords' : '220,0,390,110,485,105,400,0', 'class' : 'arrow-u'},
                    'click'     :   {'go' : 'upstairs'}
                },
                'door'      :   {
                    'area'      :   {'shape' : 'rect', 'coords' : '577,187,695,434', 'class' : 'arrow-n'},
                    'click'     :   {'go' : 'outside'}
                },
                'horse'      :   {
                    'area'      :   {'shape' : 'circle', 'coords' : '273,287,47', 'class' : 'action-examine'},
                    'click'     :   {'sfx' :  {'key' : 'horse', 'volume' : 0.05} }
                }
            },
            'tracks'    : {
                'radio' :   0.05
            }
        },
        'upstairs'  :   {
            'img'   :   'upstairs.png',
            'map'   :   {
                'stairs'  :   {
                    'area'      :   {'shape' : 'rect', 'coords' : '510,440,800,600', 'class' : 'arrow-d'},
                    'click'     :   {'go' : 'foyer'}
                },
                'trapdoor'  :   {
                    'area'      :   {'shape' : 'poly', 'coords' : '170,23,391,17,395,106,246,107', 'class' : 'arrow-u'},
                    'click'     :   {'go' : 'attic'}
                },
                'door-w'  :   {
                	'area'      :   {'shape' : 'rect', 'coords' : '243,186,265,438', 'class' : 'arrow-w'},
                	'click'     :   {'go' : 'outside'}
                },
                'door-e'  :   {
                	'area'      :   {'shape' : 'rect', 'coords' : '563,204,588,418', 'class' : 'arrow-e'},
                	'click'     :   {'go' : 'outside'}
                },
                'door-n'  :   {
                	'area'      :   {'shape' : 'rect', 'coords' : '376,216,458,408', 'class' : 'arrow-n'},
                	'click'     :   {'go' : 'outside'}
                },
                'backwards'  :   {
                	'area'      :   {'shape' : 'rect', 'coords' : '0,550,488,600', 'class' : 'arrow-s'},
                	'click'     :   {'go' : 'outside'}
                }
            },
            'tracks'    : {
                'radio' :   0.2
            }
        },
        'attic'  :   {
            'img'   :   'attic.png',
            'map'   :   {
                'back'  :   {
                    'area'      :   {'shape' : 'rect', 'coords' : '0, 550, 800, 600', 'class' : 'arrow-s'},
                    'click'     :   {'go' : 'upstairs'}
                },
                'skull'  :   {
                    'area'      :   {'shape' : 'circle', 'coords' : '62,425,27', 'class' : 'action-examine'},
                    'click'     :   {
                        'text' : {'string'    : 'Smells like wet cat...'}
                    }
                }
            },
            'tracks'    : {
                'radio' :   0.6
            }
        },
        'outside'  :   {
            'img'   :   'outside.png',
            'map'   :   {
                'door'  :   {
                    'area'      :   {'shape' : 'rect', 'coords' : '300,170,350,330', 'class' : 'arrow-n'},
                    'click'     :   {'go' : 'foyer'}
                }
            }
        }
    },
    'sfx'   : {
        'horse' :   {'src'  :   'horse.ogg'}
    },
    'tracks' : {
        'radio' :   {'src'  :   'radio.ogg'}
    },
    'variables'     : {
        /*Reserved for further development, if the adventure needs to be able to store and check information about its state*/
    }
};





















//Hey Atom, suck my whitespace
