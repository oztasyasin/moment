export const renderToast = (message, toast) => {
    toast.show(
        message,
        {
            frames: 'none',
            placement: "bottom",
            duration: 4000,
            offset: 30,
            animationType: "slide-in",
        }
    )
}