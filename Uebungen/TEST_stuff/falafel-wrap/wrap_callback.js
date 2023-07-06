function getFalafel(cb) {
  const falafel = "Falafel";
  console.log(falafel + " aus dem Kühlschrank geholt");
  cb(falafel);
}

function fryFalafel(falafel, cb) {
  setTimeout(function () {
    const friedFalafel = "Frittierte " + falafel;
    console.log(falafel + " frittiert");
    cb(friedFalafel);
  }, 1000);
}

function getWrap(cb) {
  const wrap = "Wrap";
  console.log(wrap + " aus dem Schrank geholt");
  cb(wrap);
}

function assembleFalafelWrap(wrap, friedFalafel, cb) {
  const falafelwrap = "Falafel-Wrap";
  console.log(friedFalafel + " in " + wrap + " gewickelt");
  cb(falafelwrap);
}

function prepareFalafelWrap(cb) {
  getFalafel((falafel) => {
    fryFalafel(falafel, (friedFalafel) => {
      getWrap((wrap) => {
        assembleFalafelWrap(wrap, friedFalafel, (friedFalafelWrap) => {
          cb(friedFalafelWrap);
        });
      });
    });
  });
}

function serve(meal) {
  console.log(meal + " serviert");
}

prepareFalafelWrap(serve);
