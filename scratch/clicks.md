interactions
specify an array of actions. define if they loop or are one-time-only.


'click'	: {
	'multiple'	: true
	'happens'	: 'loop' | 'once',
	'clicks'	: [
		{'sfx'	: 'horse'},
		{'text'	: 'The fun never stops.'}
	]
}



'click'	: {
	'sequence'	: [
		{
            'sfx'       : 'horse',
            'happens'   : 'once'
        },
		{
            'text'      : 'The fun never stops.'
            'happens'   : 'forever'
        }
	],
}



'click'	: {
	'sequence'	: [
		{'sfx'    : 'horse'},
		{'text'   : 'The fun never stops.'}
	],
    'sequence_repeat'   :   'forever' | <integer>,
    'sequence_index'    :   /*adventure state*/
}

'click'	: {
	'sequence'	: {
		'clicks'	:	[
			{'sfx'	: 'horse'},
			{'text'	: 'The fun never stops.'}
		],
		'repeat'	: <integer> /*0 means forever*/
	}
}
