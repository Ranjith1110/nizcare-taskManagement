import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Loading from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";


const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [ChangeUserPassword, { isLoading }] = useChangePasswordMutation();

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {

            toast.warning("passwords does not match", {
                style: {
                    backgroundColor: "#4caf50", 
                    color: "#fff",               
                    fontSize: "16px",            
                    padding: "10px"
                },
            });

            return;
        }
        try {
            const res = await ChangeUserPassword(data).unwrap();

            toast.success("New password changed", {
                style: {
                    backgroundColor: "#4caf50", 
                    color: "#fff",               
                    fontSize: "16px",            
                    padding: "10px"
                },
            });

            setTimeout(() => {
                setOpen(false);
                window.location.reload();
            }, 1500)

        } catch (error) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>

                <form onSubmit={handleSubmit(handleOnSubmit)} className="">

                    <Dialog.Title
                        as='h2'
                        className='text-base font-bold leading-6 text-gray-900 mb-4'
                    >
                        Change Password
                    </Dialog.Title>

                    <div className="mt-2 flex flex-col gap-6">

                        <Textbox
                            placeholder='New Password'
                            type='password'
                            name='password'
                            className="w-full rounded"
                            register={register("password", {
                                required: "New password is required",
                            })}
                            error={errors.password ? errors.password.message : ""}
                        />

                        <Textbox
                            placeholder='Copnfirm New Password'
                            type='password'
                            name='cpassword'
                            label='Confirm New Password'
                            className="w-full rounded"
                            register={register("cpass", {
                                required: "Confirm New password is required",
                            })}
                            error={errors.password ? errors.password.message : ""}
                        />

                        {isLoading ? (
                            <div className="py-5">
                                <Loading />
                            </div>
                        ) : (
                            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
                                <Button
                                    type='submit'
                                    className='bg-[#229ea6] px-8 text-sm font-semibold text-white'
                                    label='save'
                                />

                                <button
                                    type="button"
                                    className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </button>

                            </div>
                        )}

                    </div>

                </form>

            </ModalWrapper>
        </>
    );

};


export default ChangePassword;

