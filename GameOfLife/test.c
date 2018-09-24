#include <stdio.h>
int main(int argc, char *argv[]){
    int i=0;
    int j=0;
    int x=0;
    for (i = 0; i < 1000; i++)
    {
    	for (j = 0; j < 1000; j++)
    	{
    		x++;
    	}
    }
    printf("%d\n", x);

}