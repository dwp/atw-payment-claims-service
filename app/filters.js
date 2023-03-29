module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {}

  filters.numberMonth = function (i) {

    if (i == '1' || i == '01') {
      return "January"
    } else if (i == '2' || i == '02') {
      return "February"
    } else if (i == '3' || i == '03') {
      return "March"
    } else if (i == '4' || i == '04') {
      return "April"
    } else if (i == '5' || i == '05') {
      return "May"
    } else if (i == '6' || i == '06') {
      return "June"
    } else if (i == '7' || i == '07') {
      return "July"
    } else if (i == '8' || i == '08') {
      return "August"
    } else if (i == '9' || i == '09') {
      return "September"
    } else if (i == '10') {
      return "October"
    } else if (i == '11') {
      return "November"
    } else if (i == '12') {
      return "December"
    } else {
      return i
    }
  }

  filters.weekDay = function(day,month,year) {

    var days = new Array(7);
    days[0] = "Sunday";
    days[1] = "Monday";
    days[2] = "Tuesday";
    days[3] = "Wednesday";
    days[4] = "Thursday";
    days[5] = "Friday";
    days[6] = "Saturday";

    var a = new Date(year, month - 1, day);
    var r = days[a.getDay()];

    return r + " " + day

  }

  filters.sortBy = function (arr, prop) {
    const isNum = val => val == +val;
    const sorter = (a, b) => isNum(a[prop]) && isNum(b[prop]) ? +a[prop] - b[prop] : a[prop] < b[prop];
    arr.sort(sorter);
    return arr;
  }
  filters.sortByDate = function (arr, prefix) {
    const sorter = (a, b) => new Date(a[prefix + 'year'], a[prefix + 'month'], a[prefix + 'day']) - new Date(b[prefix + 'year'], b[prefix + 'month'], b[prefix + 'day'])
    arr.sort(sorter);
    return arr;
  }
  env.addFilter('sortBy', function (arr, prop) {
    const isNum = val => val == +val;
    const sorter = (a, b) => isNum(a[prop]) && isNum(b[prop]) ? +a[prop] - b[prop] : a[prop] < b[prop];
    arr.sort(sorter);
    return arr;
  });
  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */
  return filters
}
