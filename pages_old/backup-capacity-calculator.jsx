import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import BodyBackgroundColor from "../components/style/bodyBackgroundColor";

const BackupCapacityCalculator = () => {
  const [DGB, setDGB] = useState(1);
  const [NBWK, setNBWK] = useState(1);
  const [NBMO, setNBMO] = useState(1);
  const [TNBK, setTNBK] = useState(1);
  const [TBHR, setTBHR] = useState(1);
  const [X, setX] = useState(1);
  const [TBMO, setTBMO] = useState(1);
  const [DXR, setDXR] = useState(1);
  const [INCBKWK, setINCBKWK] = useState(1);
  const [INCBKMO, setINCBKMO] = useState(1);
  const [NBINCBK, setNBINCBK] = useState(1);
  const [INCBKHR, setINCBKHR] = useState(1);
  const [DERATIO, setDERATIO] = useState(1);

  let fullBackUpFirstData = DGB * (8000 / 100) * 1000;
  let fullBackUpSecondData = DGB * 8 * 1000;
  let fullBackUpThirdData = ((DGB * 8) / 10) * 1000;
  let incrementalBackupFirstData = ((DGB * (DXR / 100) * 8000) / 100) * 1000;
  let incrementalBackupSecondData = DGB * (DXR / 100) * 8 * 1000;
  let incrementalBackupThirdData = ((DGB * (DXR / 100) * 8) / 10) * 1000;

  // console.log("fullBackUpFirstData", fullBackUpFirstData);
  // console.log("fullBackUpSecondData", fullBackUpSecondData);
  // console.log("fullBackUpThirdData", fullBackUpThirdData);
  // console.log("incrementalBackupFirstData", incrementalBackupFirstData);
  // console.log("incrementalBackupSecondData", incrementalBackupSecondData);
  // console.log("incrementalBackupThirdData", incrementalBackupThirdData);

  // first
  const [fullBackUpFirstState, setFullBackUpFirstState] = useState({
    fullBackupFirst: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  });
  // second
  const [fullBackUpSecondState, setFullBackUpSecondState] = useState({
    fullBackupSecond: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  });
  // third
  const [fullBackUpThirdState, setFullBackUpThirdState] = useState({
    fullBackupThird: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  });
  // forth
  const [incrementalBackupFirstState, setIncrementalBackupFirstState] =
    useState({
      incrementalBackupFirst: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    });
  // fifth
  const [incrementalBackupSecondState, setIncrementalBackupSecondState] =
    useState({
      incrementalBackupSecond: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    });
  // sixth
  const [incrementalBackupThirdState, setIncrementalBackupThirdState] =
    useState({
      incrementalBackupThird: { days: 0, hours: 0, minutes: 0, seconds: 0 },
    });

  // first functions for calculations
  const fullBackUpFirstFunction = () => {
    return {
      days: Math.floor(fullBackUpFirstData / (24 * 60 * 60)),
      hours: Math.floor((fullBackUpFirstData % (3600 * 24)) / 3600),
      minutes: Math.floor((fullBackUpFirstData % 3600) / 60),
      seconds: Math.floor((fullBackUpFirstData % 3600) % 60),
    };
  };
  // second functions for calculations
  const fullBackUpSecondFunction = () => {
    return {
      days: Math.floor(fullBackUpSecondData / (24 * 60 * 60)),
      hours: Math.floor((fullBackUpSecondData % (3600 * 24)) / 3600),
      minutes: Math.floor((fullBackUpSecondData % 3600) / 60),
      seconds: Math.floor((fullBackUpSecondData % 3600) % 60),
    };
  };
  // third functions for calculations
  const fullBackUpThirdFunction = () => {
    return {
      days: Math.floor(fullBackUpThirdData / (24 * 60 * 60)),
      hours: Math.floor((fullBackUpThirdData % (3600 * 24)) / 3600),
      minutes: Math.floor((fullBackUpThirdData % 3600) / 60),
      seconds: Math.floor((fullBackUpThirdData % 3600) % 60),
    };
  };
  // forth functions for calculations
  const incrementalBackupFirstFunction = () => {
    return {
      days: Math.floor(incrementalBackupFirstData / (24 * 60 * 60)),
      hours: Math.floor((incrementalBackupFirstData % (3600 * 24)) / 3600),
      minutes: Math.floor((incrementalBackupFirstData % 3600) / 60),
      seconds: Math.floor((incrementalBackupFirstData % 3600) % 60),
    };
  };
  // fifth functions for calculations
  const incrementalBackupSecondFunction = () => {
    return {
      days: Math.floor(incrementalBackupSecondData / (24 * 60 * 60)),
      hours: Math.floor((incrementalBackupSecondData % (3600 * 24)) / 3600),
      minutes: Math.floor((incrementalBackupSecondData % 3600) / 60),
      seconds: Math.floor((incrementalBackupSecondData % 3600) % 60),
    };
  };
  // sixth functions for calculations
  const incrementalBackupThirdFunction = () => {
    return {
      days: Math.floor(incrementalBackupThirdData / (24 * 60 * 60)),
      hours: Math.floor((incrementalBackupThirdData % (3600 * 24)) / 3600),
      minutes: Math.floor((incrementalBackupThirdData % 3600) / 60),
      seconds: Math.floor((incrementalBackupThirdData % 3600) % 60),
    };
  };

  // main calculation function (onclick function)
  const resultCalculations = () => {
    setFullBackUpFirstState({
      fullBackupFirst: fullBackUpFirstFunction(fullBackUpFirstData),
    });
    setFullBackUpSecondState({
      fullBackupSecond: fullBackUpSecondFunction(fullBackUpSecondData),
    });
    setFullBackUpThirdState({
      fullBackupThird: fullBackUpThirdFunction(fullBackUpThirdData),
    });
    setIncrementalBackupFirstState({
      incrementalBackupFirst: incrementalBackupFirstFunction(
        incrementalBackupFirstData
      ),
    });
    setIncrementalBackupSecondState({
      incrementalBackupSecond: incrementalBackupSecondFunction(
        incrementalBackupSecondData
      ),
    });
    setIncrementalBackupThirdState({
      incrementalBackupThird: incrementalBackupThirdFunction(
        incrementalBackupThirdData
      ),
    });

    if (TBHR <= 0) {
      setTBHR(1);
    }
    if (X <= 0) {
      setX(1);
    }
    if (INCBKHR <= 0) {
      setINCBKHR(1);
    }
    if (DERATIO <= 0) {
      setDERATIO(1);
    }
  };

  useEffect(() => {
    resultCalculations();
  }, []);

  // console.log('data hr',fullBackUpFirstState.fullBackupFirst.hours);
  // console.log('data 1',fullBackUpFirstState.fullBackupFirst);
  // console.log('data 2',fullBackUpSecondState.fullBackupSecond);
  // console.log('data 3',fullBackUpThirdState.fullBackupThird);
  // console.log('data 4',incrementalBackupFirstState.incrementalBackupFirst);
  // console.log('data 5',incrementalBackupSecondState.incrementalBackupSecond);
  // console.log('data 6',incrementalBackupThirdState.incrementalBackupThird);

  return (
    <div className="backupCapacityCalculator">
      <h5 className="heading">Backup Capacity Calculator</h5>
      {/* <h5 className="leftHeadings">
        To evaluates required storage capacity enter backup configuration
        details:
      </h5> */}
      <div className="capacityConatiner">
        <div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">Frontend Terabyte (TB):</p>
            <input
              className="capacityInput"
              type="number"
              value={DGB}
              onInput={(e) => {
                setDGB(e.target.value);
              }}
            />
          </div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">
              Number of full backups to store per week:
            </p>
            <input
              className="capacityInput"
              type="number"
              value={NBWK}
              onInput={(e) => {
                setNBWK(e.target.value);
              }}
            />
          </div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">
              Number of full backups to store per month:
            </p>
            <input
              className="capacityInput"
              type="number"
              value={NBMO}
              onInput={(e) => {
                setNBMO(e.target.value);
              }}
            />
          </div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">
              Total number of full backups to size for:
            </p>
            <input
              className="capacityInput"
              type="number"
              value={TNBK}
              onInput={(e) => {
                setTNBK(e.target.value);
              }}
            />
          </div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">
              Target full backup window in hrs:
            </p>
            <input
              className="capacityInput"
              type="number"
              value={TBHR}
              onInput={(e) => {
                setTBHR(e.target.value);
              }}
            />
          </div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">Expected compression ratio:</p>
            <span className="spanContainer">
              <input
                className="capacityInput ratioInput"
                type="number"
                value={X}
                onInput={(e) => {
                  setX(e.target.value);
                }}
              />{" "}
              <span className="spanRatio">:</span>
              <span>1</span>
            </span>
          </div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">Storage cost per TB/month:</p>
            <input
              className="capacityInput"
              type="number"
              value={TBMO}
              onInput={(e) => {
                setTBMO(e.target.value);
              }}
            />
          </div>
        </div>

        {/* second flex */}

        <div className="dataChangeDiv">
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">
              Data change rate (between backups) (%):
            </p>
            <input
              className="capacityInput"
              type="number"
              value={DXR}
              onInput={(e) => {
                setDXR(e.target.value);
              }}
            />
          </div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">
              Number of incremental backups to store per week:
            </p>
            <input
              className="capacityInput"
              type="number"
              value={INCBKWK}
              onInput={(e) => {
                setINCBKWK(e.target.value);
              }}
            />
          </div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">
              Number of incremental backups to store per month:
            </p>
            <input
              className="capacityInput"
              type="number"
              value={INCBKMO}
              onInput={(e) => {
                setINCBKMO(e.target.value);
              }}
            />
          </div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">
              Total number of incremental backups to store:
            </p>
            <input
              className="capacityInput"
              type="number"
              value={NBINCBK}
              onInput={(e) => {
                setNBINCBK(e.target.value);
              }}
            />
          </div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">
              Target incremental backup windows in hrs:
            </p>
            <input
              className="capacityInput"
              type="number"
              value={INCBKHR}
              onInput={(e) => {
                setINCBKHR(e.target.value);
              }}
            />
          </div>
          <div className="capacityInputContainer">
            <p className="capacityInputTitle">Expected de-duplication ratio:</p>
            <span className="spanContainer">
              <input
                className="capacityInput ratioInput"
                type="number"
                value={DERATIO}
                onInput={(e) => {
                  setDERATIO(e.target.value);
                }}
              />{" "}
              <span className="spanRatio">:</span>
              <span>1</span>
            </span>
          </div>
        </div>
      </div>
      <Button onClick={resultCalculations} className="capacityCalculateBtn">
        Calculate
      </Button>

      <hr />
      <br />

      <div className="tableOne">
        <table>
          <tr>
            <th>Backup storage size</th>
            <th>Non - compressed</th>
            <th>Compressed</th>
            <th>De-dupl.</th>
            <th>Compressed + De-dupl.</th>
          </tr>
          <tr>
            {/*(Math.round(num * 100) / 100).toFixed(2) for rounding */}
            {/* (x * 1.5).toFixed(2).replace(/[.,]00$/, "") */}
            <td>Full (TB):</td>
            <td>
              {Math.round((DGB * 100) / 100)
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(Math.round(DGB * (1 / X) * 100) / 100)
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(Math.round(DGB * (1 / DERATIO) * 100) / 100)
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(Math.round(DGB * (1 / (X * DERATIO)) * 100) / 100)
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
          </tr>
          <tr>
            <td>Incremental (TB):</td>
            <td>
              {(Math.round(((DGB * DXR) / 100) * 100) / 100)
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(Math.round(DGB * (DXR / 100) * (1 / X) * 100) / 100)
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(Math.round(DGB * (DXR / 100) * (1 / DERATIO) * 100) / 100)
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {((DGB * (DXR / 100) * (1 / (X * DERATIO)) * 100) / 100)
                .toFixed(3)
                .replace(/[.,]000$/, "")}
            </td>
          </tr>
          <tr>
            <td>Weekly (TB):</td>
            <td>
              {(
                Math.round((DGB * NBWK + (DXR * DGB * INCBKWK) / 100) * 100) /
                100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                Math.round(
                  (DGB * NBWK + (DXR * DGB * INCBKWK) / 100) * (1 / X) * 100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                Math.round(
                  (DGB * NBWK + (DXR * DGB * INCBKWK) / 100) *
                    (1 / DERATIO) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                Math.round(
                  (DGB * NBWK + (DXR * DGB * INCBKWK) / 100) *
                    (1 / (X * DERATIO)) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
          </tr>
          <tr>
            <td>Monthly (TB):</td>
            <td>
              {(
                Math.round((DGB * NBMO + (DXR * DGB * INCBKMO) / 100) * 100) /
                100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                Math.round(
                  (DGB * NBMO + (DXR * DGB * INCBKMO) / 100) * (1 / X) * 100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                Math.round(
                  (DGB * NBMO + (DXR * DGB * INCBKMO) / 100) *
                    (1 / DERATIO) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                Math.round(
                  (DGB * NBMO + (DXR * DGB * INCBKMO) / 100) *
                    (1 / (X * DERATIO)) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
          </tr>
          <tr>
            <th>Total (TB):</th>
            <th>
              {(
                Math.round((DGB * TNBK + (DXR * DGB * NBINCBK) / 100) * 100) /
                100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </th>
            <th>
              {(
                Math.round(
                  (DGB * TNBK + (DXR * DGB * NBINCBK) / 100) * (1 / X) * 100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </th>
            <th>
              {(
                Math.round(
                  (DGB * TNBK + (DXR * DGB * NBINCBK) / 100) *
                    (1 / DERATIO) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </th>
            <th>
              {(
                Math.round(
                  (DGB * TNBK + (DXR * DGB * NBINCBK) / 100) *
                    (1 / (X * DERATIO)) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </th>
          </tr>
          <tr>
            <td>Cost per month:</td>
            <td>
              {(
                Math.round(
                  ((DGB * TNBK + (DXR * DGB * NBINCBK) / 100) / 1000) *
                    (TBMO * 1000) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                Math.round(
                  ((DGB * TNBK + DXR * DGB * (NBINCBK / 100)) / 1000) *
                    (TBMO * 1000) *
                    (1 / X) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                Math.round(
                  ((DGB * TNBK + DXR * DGB * (NBINCBK / 100)) / 1000) *
                    (TBMO * 1000) *
                    (1 / DERATIO) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                (((DGB * TNBK + DXR * DGB * (NBINCBK / 100)) / 1000) *
                  (TBMO * 1000) *
                  (1 / (X * DERATIO)) *
                  100) /
                100
              )
                .toFixed(3)
                .replace(/[.,]000$/, "")}
            </td>
          </tr>
          <tr>
            <td>Cost per year:</td>
            <td>
              {(
                Math.round(
                  ((DGB * TNBK + DXR * DGB * (NBINCBK / 100)) / 1000) *
                    (TBMO * 1000) *
                    12 *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                Math.round(
                  ((DGB * TNBK + DXR * DGB * (NBINCBK / 100)) / 1000) *
                    (TBMO * 1000) *
                    12 *
                    (1 / X) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                Math.round(
                  ((DGB * TNBK + DXR * DGB * (NBINCBK / 100)) / 1000) *
                    (TBMO * 1000) *
                    12 *
                    (1 / DERATIO) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {(
                Math.round(
                  ((DGB * TNBK + DXR * DGB * (NBINCBK / 100)) / 1000) *
                    (TBMO * 1000) *
                    12 *
                    (1 / (X * DERATIO)) *
                    100
                ) / 100
              )
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
          </tr>
        </table>
      </div>
      <br />
      <br />

      {/* <div className="tableTwo">
        <table>
          <tr>
            <th>
              Throughput required to meet backup window <br />{" "}
              <span>(non-compressed)</span>
            </th>
            <th>(GByte/hour)</th>
            <th>(Mbit/sec)</th>
          </tr>
          <tr>
            <td>- for full backup:</td>
            <td>
              {((((DGB / TBHR) * 100) / 100) * 1000)
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
            <td>
              {((((DGB / TBHR) * (8000 / 3600) * 100) / 100) * 1000)
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
          </tr>
          <tr>
            <td>- for incremental backup: </td>
            <td>
              {((DGB * (DXR / 100) * 1) / 1).toFixed(2).replace(/[.,]00$/, "")}
            </td>
            <td>
              {((DGB * (DXR / 100) * (8000 / 3600) * 1) / 1)
                .toFixed(2)
                .replace(/[.,]00$/, "")}
            </td>
          </tr>
        </table>
      </div>
      <br />
      <br />

      <div className="tableThree">
        <table>
          <tr>
            <th>
              Estimated backup duration <br /> <span>(non-compressed)</span>
            </th>
            <th>
              Full backup <br /> <span>(d:h:m:s)</span>
            </th>
            <th>
              Incremental backup <br /> <span>(d:h:m:s)</span>
            </th>
          </tr>
          <tr>
            <td>over 100 Mbit/s link:</td>
            <td>{`${String(fullBackUpFirstState.fullBackupFirst.days).padStart(
              2,
              "0"
            )}:${String(fullBackUpFirstState.fullBackupFirst.hours).padStart(
              2,
              "0"
            )}:${String(fullBackUpFirstState.fullBackupFirst.minutes).padStart(
              2,
              "0"
            )}:${String(fullBackUpFirstState.fullBackupFirst.seconds).padStart(
              2,
              "0"
            )}`}</td>
            <td>{`${String(
              incrementalBackupFirstState.incrementalBackupFirst.days
            ).padStart(2, "0")}:${String(
              incrementalBackupFirstState.incrementalBackupFirst.hours
            ).padStart(2, "0")}:${String(
              incrementalBackupFirstState.incrementalBackupFirst.minutes
            ).padStart(2, "0")}:${String(
              incrementalBackupFirstState.incrementalBackupFirst.seconds
            ).padStart(2, "0")}`}</td>
          </tr>
          <tr>
            <td>over 1.0 Gbit/s link:</td>
            <td>{`${String(
              fullBackUpSecondState.fullBackupSecond.days
            ).padStart(2, "0")}:${String(
              fullBackUpSecondState.fullBackupSecond.hours
            ).padStart(2, "0")}:${String(
              fullBackUpSecondState.fullBackupSecond.minutes
            ).padStart(2, "0")}:${String(
              fullBackUpSecondState.fullBackupSecond.seconds
            ).padStart(2, "0")}`}</td>
            <td>{`${String(
              incrementalBackupSecondState.incrementalBackupSecond.days
            ).padStart(2, "0")}:${String(
              incrementalBackupSecondState.incrementalBackupSecond.hours
            ).padStart(2, "0")}:${String(
              incrementalBackupSecondState.incrementalBackupSecond.minutes
            ).padStart(2, "0")}:${String(
              incrementalBackupSecondState.incrementalBackupSecond.seconds
            ).padStart(2, "0")}`}</td>
          </tr>
          <tr>
            <td>over 10.0 Gbit/s link:</td>
            <td>{`${String(fullBackUpThirdState.fullBackupThird.days).padStart(
              2,
              "0"
            )}:${String(fullBackUpThirdState.fullBackupThird.hours).padStart(
              2,
              "0"
            )}:${String(fullBackUpThirdState.fullBackupThird.minutes).padStart(
              2,
              "0"
            )}:${String(fullBackUpThirdState.fullBackupThird.seconds).padStart(
              2,
              "0"
            )}`}</td>
            <td>{`${String(
              incrementalBackupThirdState.incrementalBackupThird.days
            ).padStart(2, "0")}:${String(
              incrementalBackupThirdState.incrementalBackupThird.hours
            ).padStart(2, "0")}:${String(
              incrementalBackupThirdState.incrementalBackupThird.minutes
            ).padStart(2, "0")}:${String(
              incrementalBackupThirdState.incrementalBackupThird.seconds
            ).padStart(2, "0")}`}</td>
          </tr>
        </table>
      </div> */}

      <BodyBackgroundColor color="#d4e0fe" />
    </div>
  );
};

export default BackupCapacityCalculator;
