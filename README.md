# stopwatch.js
JavaScript stopwatch

## Installation

##### In node:

```cmd
npm install stopwatch.js --save
```

### Usage

```javascript
import { Stopwatch, Output } from 'stopwatch.js'

const stopwatch = new Stopwatch();

stopwatch.start(function(time) {
  console.log(time); // 00:00:01:95, 00:00:02:00, 00:00:02:15, ...
})

stopwatch.stop();

stopwatch.reset();

stopwatch.lap(); // 00:00:02:95
```

Author
------
* Rajeev Sharma

License:
--------

MIT License

Copyright (c) 2017 Rajeev Sharma
