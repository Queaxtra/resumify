<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

	:global(body) {
		font-family: 'Outfit', sans-serif;
	}

	:global(.pattern-bg) {
        background-color: #ffffff;
        opacity: 0.1;
        background-image: linear-gradient(rgba(0, 0, 0, 0.7) 1px, transparent 1px), 
                         linear-gradient(to right, rgba(0, 0, 0, 0.7) 1px, #ffffff 1px);
        background-size: 20px 20px;
    }
    
    :global(.gradient-overlay) {
        background: radial-gradient(circle at center, transparent 0%, #ffffff 100%),
                    linear-gradient(to right, rgba(255,255,255,1) 0%, transparent 20%, transparent 80%, rgba(255,255,255,1) 100%),
                    linear-gradient(to bottom, rgba(255,255,255,1) 0%, transparent 20%, transparent 80%, rgba(255,255,255,1) 100%);
    }
</style>