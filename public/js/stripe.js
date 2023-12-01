import { showAlert } from "./alert.js";

const stripe = Stripe(
  "pk_test_51OFsOtCXfZXrAlJ5rSzOi1CqN0xNCuqW4LsbLvlQRwU61EvFhvQbfkNxNFE7dL4joEOiL4CgtlNP41G0wfrhBkcP006XvH2ImM"
);

// export const buyArtwork = async (artworkId, userId) => {
//   try {
//     // 1) Get checkout session from API
//     const session = await axios(
//       `/api/v1/sales/checkout-session/${artworkId}/${userId}`
//     );

//     // 2) Create checkout form + chanre credit card
//     await stripe.redirectToCheckout({
//       sessionId: session.data.session.id,
//     });
//   } catch (err) {
//     console.log(err.response);
//     showAlert("error", err);
//   }
// };

// const buyBtn = document
//   .getElementById("buy-btn")
//   ?.addEventListener("click", (e) => {
//     console.log("clicked");
//     e.target.textContent = "درحال پردازش...";
//     const artworkId = e.target.dataset.artwork;
//     const userId = e.target.dataset.user;
//     buyArtwork(artworkId, userId);
//   });


export const buyArtwork = async (artworkIds, userId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios.post('/api/v1/sales/checkout-session', {
      artworkIds,
      userId,
    });

    // 2) Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err.response);
    showAlert('error', err);
  }
};

const buyBtn = document.getElementById('buy-btn')?.addEventListener('click', (e) => {
  e.target.textContent = 'درحال پردازش...';
  const artworkIds = e.target.dataset.artworks.split(',');
  const userId = e.target.dataset.user;
  console.log(artworkIds)
  buyArtwork(artworkIds, userId);
});