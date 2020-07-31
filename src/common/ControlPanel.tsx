import React from 'react';

export function ControlPanel() {
  return (
    <fieldset>
      <label htmlFor="customRange1">Example range (50%)</label>
      <input type="range" className="custom-range" id="customRange1" />
      <div className="form-check">
        <label className="form-check-label">
          <input type="radio" className="form-check-input" name="optionsRadios"
                 id="optionsRadios1" value="option1" checked />
          Option 1
        </label>
      </div>
      <div className="form-check">
        <label className="form-check-label">
          <input type="radio" className="form-check-input" name="optionsRadios"
                 id="optionsRadios2" value="option2" />
          Option 2
        </label>
      </div>
      <div className="form-check">
        <label className="form-check-label">
          <input className="form-check-input" type="checkbox" value="" checked />
          Option one
        </label>
      </div>
      <div className="form-check disabled">
        <label className="form-check-label">
          <input className="form-check-input" type="checkbox" value="" disabled />
          Option two
        </label>
      </div>
      <div className="custom-control custom-switch">
        <input type="checkbox" className="custom-control-input" id="customSwitch1" />
        <label className="custom-control-label" htmlFor="customSwitch1">Toggle this
          switch element</label>
      </div>
      <div className="custom-control custom-switch">
        <input type="checkbox" className="custom-control-input" disabled
               id="customSwitch2" />
        <label className="custom-control-label" htmlFor="customSwitch2">Disabled switch
          element</label>
      </div>
    </fieldset>
  );
}
