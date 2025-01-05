<script lang="ts">
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    let isMenuOpen = false;

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
    ];

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<nav class="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
    <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">
            <a href="/" class="flex items-center gap-2">
                <i class="ri-file-paper-2-line text-2xl text-primary"></i>
                <span class="font-bold text-xl">Resumify</span>
            </a>

            <div class="hidden md:flex items-center gap-8">
                {#each navLinks as link}
                    <a href={link.href} class="opacity-75 hover:opacity-100 transition-all duration-300">
                        {link.name}
                    </a>
                {/each}
            </div>

            <div class="hidden md:flex items-center gap-4">
                <a href="/create" class="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all duration-300">
                    Create Resume
                </a>
            </div>

            <button class="md:hidden p-2" on:click={toggleMenu}>
                <div class="w-6 flex flex-col gap-1.5">
                    <span class="w-6 h-0.5 bg-gray-800 block transition-all duration-300" class:rotate-45={isMenuOpen} class:translate-y-2={isMenuOpen}></span>
                    <span class="w-6 h-0.5 bg-gray-800 block transition-all duration-300" class:opacity-0={isMenuOpen}></span>
                    <span class="w-6 h-0.5 bg-gray-800 block transition-all duration-300" class:-rotate-45={isMenuOpen} class:-translate-y-2={isMenuOpen}></span>
                </div>
            </button>
        </div>
    </div>

    {#if isMenuOpen}
        <div class="absolute top-16 left-0 right-0 bg-white border-t border-gray-100" transition:slide={{ duration: 300, easing: quintOut }}>
            <div class="max-w-7xl mx-auto px-4 py-4">
                <div class="flex flex-col space-y-3">
                    {#each navLinks as link}
                        <a href={link.href} class="py-2 opacity-75 hover:opacity-100 transition-all duration-300" on:click={toggleMenu}>
                            {link.name}
                        </a>
                    {/each}
                    <div class="pt-3 border-t border-gray-100">
                        <a href="/create" class="inline-flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all duration-300 w-full justify-center" on:click={toggleMenu}>
                            Create Resume
                            <i class="ri-arrow-right-line"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</nav>

<div class="h-16"></div> 