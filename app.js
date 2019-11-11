// changing favorite value from true-false and false-to
$("#favorite").click(e => {
  e.preventDefault();
  console.log("favorite target");
  console.log(e.target.id);
  $.ajax({
    method: "PUT",
    url: `/articles/${e.target.id}`
  }).then(result => {
    //    if({{favorite}}) {
    //         return this.favorite = false
    //     } else {
    //         return this.favorite = true
    //     }
    // console.log(this.favorite);

    location.reload();
  });
});

// delete button
$("#delete").click(e => {
  e.preventDefault();
  console.log("deleting");
  console.log(e.target.id);
  $.ajax({
    type: "DELETE",
    url: `/articles/${e.target.id}`
  }).then(result => {
    console.log(result);
    location.reload();
  });
});

// Comments button
$('#comments').click(e => {
    e.preventDefault()
    console.log('opening up comments')
    console.log(e.target.id)
    $.ajax({
        type: "GET",
        url: "/"
    }).then(result => {
        console.log(result)
        location.reload()
    })
})


















// $("#add-new-btn").click(e => {
//   e.preventDefault();
//   var newBurger = $("#add-new-input")
//     .val()
//     .trim();
//   console.log(newBurger);
//   if (newBurger) {
//     $.ajax({
//       method: "POST",
//       url: "/api/burgers",
//       data: {
//         burger_name: newBurger
//       }
//     })
//       .then(result => {
//         console.log(result);
//         location.reload();
//       })
//       .catch(error => console.log(error));
//   }
// });