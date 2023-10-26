import React from "react";

const InstrumentIcon = ({ instrument, tuneUp }) => {
    const instrumentIconMap = {
      piano: "fa-piano",
      guitar: "fa-guitar-electric",
      violin: "fa-violin",
      trumpet: "fa-trumpet",
      flute: "fa-flute",
      drums: "fa-drum",
      saxophone: "fa-saxophone",
      clarinet: "fa-clarinet",
      banjo: "fa-banjo",
      vocals: "fa-microphone-stand"
    };

    const normalizedInstrument = instrument.toLowerCase();

    return tuneUp.instruments.includes(instrument) ? (
      <span>
        <i className={`fa-sharp fa-light ${instrumentIconMap[normalizedInstrument]}`}></i>
      </span>
    ) : null;
  };

export default InstrumentIcon;
