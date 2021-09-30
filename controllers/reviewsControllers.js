const { Reviews, Users, Movies } = require('../models');
const Joi = require('joi');


module.exports = {
    postReview: async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                comment: Joi.string(),
                rating: Joi.number().min(1).max(5).required(),
            });

            const { error } = schema.validate({ ...body }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: error["details"][0]["message"]
                })
            }
            const checkUsers = await Reviews.findOne({ where: { UserId: Users.id, MovieId: Movies.id } })
            if (checkUsers) {
                return res.status(400).json({
                    status: "Failed",
                    message: "You already add review"
                })
            } else if (!checkUsers) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Sorry, You Have to Login First",
                })
            }

            const newReview = await Reviews.create({
                comment: body.comment,
                rating: body.rating
            })
            /* real time */
            //         appendToDom(data)
            //         textarea.value = ''
            //         // Broadcast
            //         broadcastComment(data)
            //         // Sync with Mongo Db
            //         syncWithDb(data)


            //         function appendToDom(data) {
            //             let lTag = document.createElement('li')
            //             lTag.classList.add('comment', 'mb-3')

            //             let markup = `
            //                     <div class="card border-light mb-3">
            //                         <div class="card-body">
            //                             <h6>${data.username}</h6>
            //                             <p>${data.comment}</p>
            //                             <div>
            //                                 <img src="/img/clock.png" alt="clock">
            //                                 <small>${moment(data.time).format('LT')}</small>
            //                             </div>
            //                         </div>
            //                     </div>
            // `
            //             lTag.innerHTML = markup

            //             commentBox.prepend(lTag)
            //         }

            //         function broadcastComment(data) {
            //             // Socket
            //             socket.emit('comment', data)
            //         }

            //         socket.on('comment', (data) => {
            //             appendToDom(data)
            //         })
            //         let timerId = null
            //         function debounce(func, timer) {
            //             if (timerId) {
            //                 clearTimeout(timerId)
            //             }
            //             timerId = setTimeout(() => {
            //                 func()
            //             }, timer)
            //         }
            //         let typingDiv = document.querySelector('.typing')
            //         socket.on('typing', (data) => {
            //             typingDiv.innerText = `${data.username} is typing...`
            //             debounce(function () {
            //                 typingDiv.innerText = ''
            //             }, 1000)
            //         })

            //         // Event listner on textarea
            //         textarea.addEventListener('keyup', (e) => {
            //             socket.emit('typing', { username })
            //         })

            //         // Api calls 

            //         function syncWithDb(data) {
            //             const headers = {
            //                 'Content-Type': 'application/json'
            //             }
            //             fetch('/api/comments', { method: 'Post', body: JSON.stringify(data), headers })
            //                 .then(response => response.json())
            //                 .then(result => {
            //                     console.log(result)
            //                 })
            //         }

            //         function fetchComments() {
            //             fetch('/api/comments')
            //                 .then(res => res.json())
            //                 .then(result => {
            //                     result.forEach((comment) => {
            //                         comment.time = comment.createdAt
            //                         appendToDom(comment)
            //                     })
            //                 })
            //         }

            //         window.onload = fetchComments


            /* average rating */
            const avarageRating = await Reviews.findAll({
                where: {
                    MovieId: Movies.id
                }
            })

            let average = avarageRating.map(e => {
                return e.dataValues.rating
            })
            average.push(body.rating)

            const sum = average.reduce((a, b) => a + b)
            const realRating = Math.round(sum / average.length)

            const updateMovies = await Movies.update({
                ...body,
                rating: realRating,
            }, {
                where: {
                    id: newReview.dataValues.MovieId
                }
            })

            if (!updateMovies[0]) {
                transaction.rollback()
                return res.status(400).json({
                    status: "Failed",
                    message: "Unable to update database",
                });
            }

            newReview.save().then(response => {
                res.send(response)
            })

            if (!newReview) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unable to save the data to database"
                })
            }

            res.status(200).json({
                status: "Successs",
                message: " Successfully saved to database",
                data: newReview
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    getReviews: async (req, res) => {
        try {
            const content = await Reviews.findAll({
                attributes: {
                    exclude: ["id", "updatedAt", "createAt"]
                },
                include: [
                    {
                        as: "user",
                        model: Users,
                        attributes: ['fullname', 'img']
                    },
                ],
                offset: (15 * (page - 1)) + 1,
                limit: 15
            })
            if (!content) {
                return res.status(200).json({
                    status: "Failed",
                    message: "Data Not Found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved review",
                data: content
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    getReview: async (req, res) => {
        try {
            const content = await Reviews.findOne({
                where: {
                    id: req.params.id
                },
                attributes: {
                    exclude: ["id", "updatedAt", "createAt"]
                },
                include: [
                    {
                        as: "user",
                        model: Users,
                        attributes: ['fullname', 'img']
                    },
                ],
            })
            if (!content) {
                return res.status(200).json({
                    status: "Failed",
                    message: "Data Not Found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved review",
                data: content
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    updateReview: async (req, res) => {
        const body = req.body
        try {
            const schema = Joi.object({
                comment: Joi.string().required(),
                rating: Joi.number().required(),
            });

            const { error } = schema.validate({ ...body }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: error["details"][0]["message"]
                })
            }
            const updatedReview = await Reviews.update({ ...body }, {
                where: {
                    id: req.params.id
                }
            });

            if (!updatedReview[0]) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Unable to Update Database"
                })
            }

            const data = await Reviews.findOne({
                where: {
                    id: req.params.id,
                }
            })

            return res.status(200).json({
                status: "Success",
                message: "Data Update Successfully",
                data: data
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },
    deleteReview: async (req, res) => {
        const id = req.params.id
        try {
            const remove = await Reviews.destroy({
                where: {
                    id
                }
            }
            )
            if (!remove) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Unable to Delete the Data"
                })
            }
            return res.status(200).json({
                status: "Success",
                message: "Deleted to Successfully"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            });
        }
    }
}