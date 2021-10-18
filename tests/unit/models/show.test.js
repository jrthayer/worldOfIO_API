//------------//------------//------------//------------
//Table Of Contents
//------------//------------//------------//------------
// 1. Mongoose Validation
// 2. Joi Validation
//------------//------------//------------//------------

//------------//------------//------------//------------
// Properties
//------------//------------//------------//------------
// 1. Name Property
// 2. Banner Property
// 3. BannerImg Property
// 4. Time Property
//     +Day Property
//     +Minutes Property
//------------//------------//------------//------------

const { Show, validate } = require("../../../models/show");

describe("/models/show", () => {
    let showData;

    beforeEach(() => {
        showData = {
            name: "Test Name",
            banner: "test banner",
            time: {
                day: 0,
                minutes: 160,
            },
        };
    });

    //------------//------------//------------//------------
    //Mongoose Validation
    //------------//------------//------------//------------
    describe("mongoose validation", () => {
        //returns error object if there IS an error,
        //null is returned otherwise
        const create = async () => {
            let error = null;

            try {
                let show = new Show(showData);
                await show.validate();
            } catch (err) {
                error = err;
            }

            return error;
        };

        describe("Name Property", () => {
            it("should return error if name is not provided", async () => {
                delete showData["name"];

                const result = await create();

                expect(result).not.toBeNull();
            });

            it("should convert name to string if not a string", async () => {
                showData.name = false;

                const result = await create();

                expect(result).toBeNull();
            });

            it("should return error if name is more than 100 characters", async () => {
                showData.name = "a".repeat(101);

                const result = await create();

                expect(result).not.toBeNull();
            });
        });

        describe("Banner Property", () => {
            it("should NOT return error if banner is not provided", async () => {
                delete showData["banner"];

                const result = await create();

                expect(result).toBeNull();
            });

            it("should convert banner to string if not a string", async () => {
                showData.banner = false;

                const result = await create();

                expect(result).toBeNull();
            });

            it("should return error if banner is more than 255 characters", async () => {
                showData.banner = "a".repeat(256);

                const result = await create();

                expect(result).not.toBeNull();
            });
        });

        describe("BannerImg Property", () => {
            it("should NOT return error if bannerImg is not provided", async () => {
                delete showData["bannerImg"];

                const result = await create();

                expect(result).toBeNull();
            });

            it("should convert bannerImg to string if not a string", async () => {
                showData.bannerImg = false;

                const result = await create();

                expect(result).toBeNull();
            });

            it("should return error if bannerImg is more than 255 characters", async () => {
                showData.bannerImg = "a".repeat(256);

                const result = await create();

                expect(result).not.toBeNull();
            });
        });

        describe("Time Property", () => {
            it("should return error if time is not provided", async () => {
                delete showData["time"];

                const result = await create();

                expect(result).not.toBeNull();
            });

            describe("Day", () => {
                it("should return error if day is not provided", async () => {
                    delete showData.time["day"];

                    const result = await create();

                    expect(result).not.toBeNull();
                });

                it("should return error if day is not a number", async () => {
                    showData.time.day = "tuesday";

                    const result = await create();

                    expect(result).not.toBeNull();
                });

                it("should return error if day is less than 0", async () => {
                    showData.time.day = -1;

                    const result = await create();

                    expect(result).not.toBeNull();
                });

                it("should return error is greater than 6", async () => {
                    showData.time.day = 7;

                    const result = await create();

                    expect(result).not.toBeNull();
                });
            });

            describe("Minutes", () => {
                it("should return error if minutes is not provided", async () => {
                    delete showData.time["minutes"];

                    const result = await create();

                    expect(result).not.toBeNull();
                });

                it("should return error if minutes is not a number", async () => {
                    showData.time.minutes = "One Hundred";

                    const result = await create();

                    expect(result).not.toBeNull();
                });

                it("should return error is minutes is less than 0", async () => {
                    showData.time.minutes = -1;

                    const result = await create();

                    expect(result).not.toBeNull();
                });

                it("should return error is greater than 1440", async () => {
                    showData.time.minutes = 1441;

                    const result = await create();

                    expect(result).not.toBeNull();
                });
            });
        });

        describe("Completed Property", () => {
            it("should return error if completed is not a boolean", () => {
                showData.completed = "404";

                const result = create();

                expect(result).not.toBeNull();
            });

            it("should set completed to false if not provided", () => {
                let show = new Show(showData);

                expect(show.completed).toEqual(false);
            });
        });

        describe("Delayed Property", () => {
            it("should return error if delayed is not a boolean", () => {
                showData.delayed = "404";

                const result = create();

                expect(result).not.toBeNull();
            });

            it("should set delayed to false if not provided", () => {
                let show = new Show(showData);

                expect(show.delayed).toEqual(false);
            });
        });
    });

    //------------//------------//------------//------------
    //JOI VALIDATION
    //------------//------------//------------//------------
    describe("joi validation", () => {
        //returns error object if there IS an error,
        //null is returned otherwise
        const create = () => {
            const { error } = validate(showData);
            return error;
        };

        describe("Name Property", () => {
            it("should return error if name is not provided", () => {
                delete showData["name"];

                const result = create();

                expect(result).not.toBeUndefined();
            });

            it("should return error if name is not a string", () => {
                showData.name = false;

                const result = create();

                expect(result).not.toBeUndefined();
            });

            it("should return error if name is more than 100 characters", () => {
                showData.name = "a".repeat(101);

                const result = create();

                expect(result).not.toBeUndefined();
            });
        });

        describe("Banner Property", () => {
            it("should NOT return error if banner is not provided", () => {
                delete showData["banner"];

                const result = create();

                expect(result).toBeUndefined();
            });

            it("should return error if banner is not a string", () => {
                showData.banner = false;

                const result = create();

                expect(result).not.toBeUndefined();
            });

            it("should return error if banner is more than 255 characters", () => {
                showData.banner = "a".repeat(256);

                const result = create();

                expect(result).not.toBeUndefined();
            });
        });

        describe("BannerImg Property", () => {
            it("should NOT return error if bannerImg is not provided", () => {
                delete showData["bannerImg"];

                const result = create();

                expect(result).toBeUndefined();
            });

            it("should return error if bannerImg is not a string", () => {
                showData.bannerImg = false;

                const result = create();

                expect(result).not.toBeUndefined();
            });

            it("should return error if bannerImg is more than 255 characters", () => {
                showData.bannerImg = "a".repeat(256);

                const result = create();

                expect(result).not.toBeUndefined();
            });
        });

        describe("Time Property", () => {
            it("should return error if time is not provided", () => {
                delete showData["time"];

                const result = create();

                expect(result).not.toBeUndefined();
            });

            describe("Day", () => {
                it("should return error if day is not provided", () => {
                    delete showData.time["day"];

                    const result = create();

                    expect(result).not.toBeUndefined();
                });

                it("should return error if day is not a number", () => {
                    showData.time.day = "tuesday";

                    const result = create();

                    expect(result).not.toBeUndefined();
                });

                it("should return error if day is less than 0", () => {
                    showData.time.day = -1;

                    const result = create();

                    expect(result).not.toBeUndefined();
                });

                it("should return error is greater than 6", () => {
                    showData.time.day = 7;

                    const result = create();

                    expect(result).not.toBeUndefined();
                });
            });

            describe("Minutes", () => {
                it("should return error if minutes is not provided", () => {
                    delete showData.time["minutes"];

                    const result = create();

                    expect(result).not.toBeUndefined();
                });

                it("should return error if minutes is not a number", () => {
                    showData.time.minutes = "One Hundred";

                    const result = create();

                    expect(result).not.toBeUndefined();
                });

                it("should return error is minutes is less than 0", () => {
                    showData.time.minutes = -1;

                    const result = create();

                    expect(result).not.toBeUndefined();
                });

                it("should return error is greater than 1440", () => {
                    showData.time.minutes = 1441;

                    const result = create();

                    expect(result).not.toBeUndefined();
                });
            });

            describe("Completed Property", () => {
                it("should return error if completed is not a boolean", () => {
                    showData.completed = "404";

                    const result = create();

                    expect(result).not.toBeUndefined();
                });
            });

            describe("Delayed Property", () => {
                it("should return error if delayed is not a boolean", () => {
                    showData.delayed = "404";

                    const result = create();

                    expect(result).not.toBeUndefined();
                });
            });
        });
    });
});
