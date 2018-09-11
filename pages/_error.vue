<template>
    <section class="wrapper">
        <section class="top">
            <h1>Uh oh... le serveur est injoignable !</h1>
            <p>
                Nos ingénieurs travaillent nuit et jour pour régler ce soucis.
            </p>
        </section>
    </section>
</template>

<script>
export default {
    name: 'Error'
}
</script>

<style>
    .wrapper {
        height: 100%;
        width: 100%;
        position: relative;
    }

    .top {
        position: absolute;
        top: 5vh;
        left: 5vw;
    }

    h1 {
        margin-bottom: 16px;
        font-family: Lato;
        font-size: 50px;
        font-weight: 300;
        line-height: 84px;
    }

    .top p {
        font-family: Roboto;
        font-size: 25px;
        line-height: 39px;
    }
</style>


