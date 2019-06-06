lab idea

"sequence" property

specify an array of actions. define if they loop or are one-time-only.

'click'	: {
	'sequence'	: {
		'clicks'	:	[
			{'sfx'	: 'horse'},
			{'text'	: 'The fun never stops.'}
		],
		'repeat'	: <integer> /*0 means forever*/
	}
}
