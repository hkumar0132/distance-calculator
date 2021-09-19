const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const getDistance = async (req, res) => {
  const { firstCity, secondCity } = req.body;

  const URI = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${firstCity}&destinations=${secondCity}&key=${process.env.TOKEN}`;

  //To decode certain special characters
  const convertedURI = new URL(URI);

  return await fetch(convertedURI)
  .then((response) => response.json())
  .then((response) => {
    console.log('res', response);
    console.log('res-rows-elements-distance', response["rows"][0]["elements"][0]);

    /*
      If response does not exists or status is not OK or no distance is returned,
      then there could be issue with user input
    */
    if(!response || response.status !== 'OK' || response["rows"][0]["elements"].length === 0) {
      return res.status(400).send(`Try changing city names`);
    }

    const distance = response["rows"][0]["elements"][0]["distance"]["text"];
    return res.status(200).send(`${distance} kilometres from ${response["origin_addresses"][0]} to ${response["destination_addresses"][0]}`);
  })
  .catch((err) => {
    return res.status(400).send(`Error processing request at the moment, ${err}`);
  });
}

module.exports = {
  getDistance
}