var adventure = {
    "meta"  :   {
        /* Stuff defining the adventure will probably go here */
        "name"      :   "Dennis Quest",
        "author"    :   "Dennis",
        "start"     :   "outside",
        "screen"    :   {"width" : 800, "height" : 600},
        "path"      :   "assets/" /*Not in use yet*/
    },
    "rooms"   :   {
        "foyer" :   {
            "img"   :   "foyer.png",
            "map"   :   {
                "stairs"    :   {
                    "area"      :   {"shape" : "poly", "coords" : "220,0,390,110,485,105,400,0", "class" : "arrow-u"},
                    "click"     :   {"go" : "upstairs"}
                },
                "door"      :   {
                    "area"      :   {"shape" : "rect", "coords" : "577,187,695,434", "class" : "arrow-n"},
                    "click"     :   {"go" : "outside"}
                },
                "light"     :   {
                    "area"      :   {"shape" : "circle", "coords" : "720,90,35", "class" : "action-examine"},
                    "click"     :   {
                        "set"   :   {
                            "variable"  :   "foo",
                            "value"     :   "$foo + 1"
                        }
                    }
                },
                "horse"     :   {
                    "area"      :   {"shape" : "circle", "coords" : "273,287,47", "class" : "action-hand"},
                    "click"     :   {
                        "sequence"  :   {
                            "actions"    :   [
                                {
                                    "set"  : {"variable" : "bar", "value" : true},
                                    "text" : {"string"    : "*CLICK*"}
                                },
                                {
                                    "text" : {"string"    : "It won't barge..."}
                                }
                            ],
                            "repeat"    :   "last"
                        }
                    }
                },
                "painting"  :   {
                    "area"      :   {"shape" : "poly", "coords" : "100,260,205,259,205,100,100,65", "class" : "action-examine"},
                    "click"     :   {
                        "sequence"  :   {
                            "actions"    :   [
                                {"sfx"  : {"key" : "horse", "volume" : 0.05}        },
                                {"text" : {"string"    : "The fun never stops."}    }
                            ],
                            "repeat"    :   "forever"
                        }
                    }
                }
            },
            "tracks"    : {
                "radio" :   0.05
            }
        },
        "upstairs"  :   {
            "img"   :   "upstairs.png",
            "map"   :   {
                "stairs"  :   {
                    "area"      :   {"shape" : "rect", "coords" : "510,440,800,600", "class" : "arrow-d"},
                    "click"     :   {"go" : "foyer"}
                },
                "trapdoor"  :   {
                    "area"      :   {"shape" : "poly", "coords" : "170,23,391,17,395,106,246,107", "class" : "arrow-u"},
                    "click"     :   {"go" : "attic"}
                },
                "door-w"  :   {
                	"area"      :   {"shape" : "rect", "coords" : "243,186,265,438", "class" : "arrow-w"},
                	"click"     :   {"go" : "outside"}
                },
                "door-e"  :   {
                	"area"      :   {"shape" : "rect", "coords" : "563,204,588,418", "class" : "arrow-e"},
                	"click"     :   {"go" : "outside"}
                },
                "door-n"  :   {
                	"area"      :   {"shape" : "rect", "coords" : "376,216,458,408", "class" : "arrow-n"},
                	"click"     :   {
                        "condition" : {
                            "if"    :   "($bar == true)",
                            "then"  :   {
                                "go"    :   "bathroom"
                            },
                            "else"  :   {
                                "text"  :   {
                                    "string"    :   "...locked."
                                },
                                "sfx"   :   {
                                    "key"       :   "locked",
                                    "volume"    :   1
                                }
                            }
                        }
                    }
                },
                "backwards"  :   {
                	"area"      :   {"shape" : "rect", "coords" : "0,550,488,600", "class" : "arrow-s"},
                	"click"     :   {"go" : "outside"}
                }
            },
            "tracks"    : {
                "radio" :   0.2
            }
        },
        "attic"  :   {
            "img"   :   "attic.png",
            "map"   :   {
                "back"  :   {
                    "area"      :   {"shape" : "rect", "coords" : "0, 550, 800, 600", "class" : "arrow-s"},
                    "click"     :   {"go" : "upstairs"}
                },
                "skull"  :   {
                    "area"      :   {"shape" : "circle", "coords" : "62,425,27", "class" : "action-examine"},
                    "click"     :   {
                        "text" : {"string"    : "Smells like wet cat...", "class" : "text-jittery text-dripping"}
                    }
                }
            },
            "tracks"    : {
                "radio" :   0.6
            }
        },
        "outside"  :   {
            "img"   :   "outside.png",
            "map"   :   {
                "door"  :   {
                    "area"      :   {"shape" : "rect", "coords" : "300,170,350,330", "class" : "arrow-n"},
                    "click"     :   {"go" : "foyer"}
                }
            }
        },
        "bathroom" :   {
            "img"   :   "bathroom.png",
            "map"   :   {
                "back"  :   {
                    "area"      :   {"shape" : "rect", "coords" : "0, 550, 800, 600", "class" : "arrow-s"},
                    "click"     :   {"go" : "upstairs"}
                },
                "door"  :   {
                    "area"      :   {"shape" : "poly", "coords" : "638,21,694,0,780,0,721,539,612,473", "class" : "arrow-e"},
                    "click"     :   {
                        "text"  :   {
                            "string"    :   "...locked."
                        },
                        "sfx"   :   {
                            "key"       :   "locked",
                            "volume"    :   1
                        }
                    }
                },
                "mirror"    : {
                    "area"      :   {"shape" : "rect", "coords" : "333,56,451,233", "class" : "action-examine"},
                    "click"      :   {
                        "text"    :   {
                            "string"    :   "Lookin' good"
                        }
                    }
                }
            },
            "tracks"    : {
                "radio" :   0.05
            }
        }
    },
    "sfx"   : {
        "horse"     :   {"src"  :   "horse.ogg"},
        "locked"    :   {"src"  :   "locked.ogg"}
    },
    "tracks" : {
        "radio" :   {"src"  :   "radio.ogg"}
    },
    "variables"     : {
        "foo"   :   0,
        "bar"   :   false
    }
};





















//Hey Atom, suck my whitespace
