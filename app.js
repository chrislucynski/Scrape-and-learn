// changing favorite value from true-false and false-to
$('.saved').click(e => {
  e.preventDefault();
  console.log("save target");
  let targetId = e.target.id
  console.log(targetId);
  $.ajax({
    method: "PUT",
    url: `/articles/${targetId}`
  }).then(result => {
    console.log(result)
       if(this.save) {
            return this.save = false
        } else {
            return this.save = true
        }
    console.log(this.save);

    location.reload();
  });
});

// Comments button
$('.comments').click(e => {
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






// delete button
// $("#delete").click(e => {
//   e.preventDefault();
//   console.log("deleting");
//   console.log(e.target.id);
//   $.ajax({
//     type: "DELETE",
//     url: `/articles/${e.target.id}`
//   }).then(result => {
//     console.log(result);
//     location.reload();
//   });
// });

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