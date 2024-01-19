
// calculate the amount by cell color in range (flat and multi-dimensional)
// use on sheet as =COLOUR("A1:C10") with quotes! 
function COLOUR(input) {
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getActiveSheet();
  const bcolors = sh.getRange(input).getBackgrounds(); 
  const ceils = sh.getRange(input).getValues();
  
  let all = [];
  let calc_colors = {};
  let color_names = { 
    '#ffff00': 'Важно', 
    '#ffffff': 'Не важно', 
    '#ff0000': 'Срочно',
    '#00ff00': 'Не срочно', 
    '#ffd966': 'Не срочно и не важно'
    };

  // TODO:  https://developers.google.com/apps-script/reference/spreadsheet/range?hl=ru#setbackgroundscolor
  let add_color = function (color, value) {
    value = value || 0;
    let color_name = color_names[color] || color;
    if (!color_names[color]) {
      console.log('No match color:' + color);
    }
    
    if (!calc_colors[color_name]) {
        calc_colors[color_name] = parseFloat(value);
      }
      else {
        calc_colors[color_name] += parseFloat(value);
      }
  };

  for (let i = 0; i < bcolors.length; i++) {
    if (bcolors[i].length > 1) {
      let color_arr = bcolors[i],
          value_arr = ceils[i];
      for (let i = 0; i < color_arr.length; i++) {
        add_color(color_arr[i], value_arr[i]);
      }
    }
    else {
      add_color(bcolors[i], ceils[i]);
    }
  }
  
  for (const [key, value] of Object.entries(calc_colors)) {
     all.push([ key, value ]);
  }

  return all;

}
