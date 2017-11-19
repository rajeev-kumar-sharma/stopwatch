# stopwatch.js
JavaScript stopwatch

## Installation

##### In node:

```cmd
npm install stopwatch.js --save
```

### Usage

##### - typescript

```javascript
import { Stopwatch } from 'stopwatch.js'

// string output
const stopwatch = new Stopwatch();

stopwatch.start((time) => console.log(time)); // 00:00:01:95, 00:00:02:00, 00:00:02:15, ...

stopwatch.stop();

stopwatch.reset();

stopwatch.lap(); // 00:00:02:95
```

```javascript
import { Stopwatch, Output } from 'stopwatch.js'

// array output
const stopwatch = new Stopwatch(Output.Array);

stopwatch.start((time) => console.log(time)); // ['00', '00', '01', '95'], ['00', '00', '02', '00'], ['00', '00', '02', '15'], ...

stopwatch.stop();

stopwatch.reset();

stopwatch.lap(); // ['00', '00', '02', '95']
```

##### - javascript

```javascript
const stopwatchJs = rewuire('stopwatch.js').Stopwatch;

const stopwatch = new Stopwatch();
```

```javascript
const stopwatchJs = require('stopwatch.js').Stopwatch;
const output = require('stopwatch.js').Output;

const stopwatch = new stopwatchJs(output.Array);
```


##### In browser:

```html
<script src="https://cdn.jsdelivr.net/npm/stopwatch.js@1.1.0/dist/stopwatch.min.js"></script>
```

### Usage

```javascript
var output = stopwatchJs.Output;
var stopwatch = new stopwatchJs.Stopwatch();

stopwatch.start(function(time) {
  // do something with time
})
```

Author
------
* Rajeev Sharma

License:
--------

MIT License

Copyright (c) 2017 Rajeev Sharma
