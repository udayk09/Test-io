// sk_test_51Nw9UuEQLsa2XJpCToSWoDH4NC33DRC0VO1wX51dOg2AzlHK9Vo9INPNWgm8ULEnC3hmUxqbXjePQQ6GLi4jK1Mi00mYpwb707
//Art1_Picasso: price_1Nw9YoEQLsa2XJpCPrsjuhLp
//Art2_MonaLIsa:price_1Nw9afEQLsa2XJpCiLFFm9M3
//Art3__:price_1Nw9bWEQLsa2XJpCCTTf5rWO
const express = require('express');
var cors = require('cors');
const stripe = require('stripe')('sk_test_51Nw9UuEQLsa2XJpCToSWoDH4NC33DRC0VO1wX51dOg2AzlHK9Vo9INPNWgm8ULEnC3hmUxqbXjePQQ6GLi4jK1Mi00mYpwb707');

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
    console.log(req.body);
    const items = req.body.items;
    let lineItems = [];
    items.forEach((item)=> {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));
});

app.listen(4000, () => console.log("Listening on port 4000!"));