<script>
    const socialLinks = [
        { icon: 'ri-github-fill', href: 'https://github.com/queaxtra/resumify' },
        { icon: 'ri-twitter-x-fill', href: 'https://x.com/queaxtra' },
        { icon: 'ri-linkedin-fill', href: 'https://linkedin.com/in/queaxtra' }
    ];
</script>

<footer class="bg-white border-t">
    <div class="max-w-7xl mx-auto px-4 py-7">
        <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="flex flex-col items-center gap-2 mb-4 md:mb-0">
                <a href="/" class="flex items-center gap-2">
                    <i class="ri-file-paper-2-line text-2xl text-primary"></i>
                    <span class="font-bold text-xl">Resumify</span>
                </a>
                <p class="opacity-75 text-sm">Made with <i class="ri-heart-fill text-primary"></i> by <a href="https://github.com/queaxtra" class="underline">Queaxtra</a></p>
            </div>

            <div class="flex items-center gap-4">
                {#each socialLinks as social}
                    <a href={social.href} target="_blank" rel="noopener noreferrer" 
                       class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-all duration-300">
                        <i class="{social.icon} text-primary"></i>
                    </a>
                {/each}
            </div>
        </div>
    </div>
</footer> 